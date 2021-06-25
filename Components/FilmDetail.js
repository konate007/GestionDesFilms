import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator,
  ScrollView, Image, Button, TouchableOpacity, Share, Platform} from 'react-native'
import {getFilmDetailFromApi} from '../API/TMDBApi'
import {getImageFromApi} from '../API/TMDBApi'
import { connect } from 'react-redux'


class FilmDetail extends React.Component
{

    constructor(props){
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }
    }

    componentDidMount(){
      getFilmDetailFromApi(this.props.route.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }

    _shareFilm() {
      const { film } = this.state
      Share.share({ title: film.title, message: film.overview })
   }


   _displayFloatingActionButton() {
    const { film } = this.state
    if (film != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../Images/ic_share.png')} />
        </TouchableOpacity>
      )
    }
   }
  

    componentDidUpdate() {
      console.log("componentDidUpdate : ")
      console.log(this.props.favoritesFilm)
    }


    _toggleFavorite() {
      //Définition de notre action ici
      const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
      this.props.dispatch(action)

    }


    _displayFavoriteImage() {
      var sourceImage = require('../Images/ic_favorite_border.png')
      if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
        // Film dans nos favoris
        sourceImage = require('../Images/ic_favorite.png')
      }
      return (
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      )
    }


    _displayFilm() {
        const { film } = this.state
        if (film != undefined) {
          return (
            <ScrollView style={styles.scrollview_container}>
              <Image
                style={styles.image}
                source={{uri: getImageFromApi(film.backdrop_path)}}
              />
              <Text style={styles.title_text}>{film.title}</Text>
              <TouchableOpacity
                style={styles.favorite_container}
                onPress={() => this._toggleFavorite()}>
                {this._displayFavoriteImage()}
              </TouchableOpacity>
              <Text style={styles.description_text}>{film.overview}</Text>
              <Text style={styles.default_text}>Sorti le {film.release_date}</Text>
              <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
              <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
              <Text style={styles.default_text}>Budget : {film.budget}</Text>
            </ScrollView>
          )
        }
      }

    _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
            </View>
          )
        }
      }

    render()
    {
        //console.log(this.props)
        //console.log(this.state)
        //console.log( " IdFilm : " + this.props.route.params.idFilm)
        return(
            <View style={StyleSheet.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
                {this._displayFloatingActionButton()} 
            </View>
        )
    }
}

const styles = StyleSheet.create({

    main_container: {
        flex: 1
    },

    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    scrollView_container: {
          flex: 1
    },

    image: {
      height: 169,
      margin: 5
    },

    title_text: {
      fontWeight: 'bold',
      fontSize: 35,
      flex: 1,
      flexWrap: 'wrap',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      marginBottom: 10,
      color: '#000000',
      textAlign: 'center'
    },

    description_text: {
      fontStyle: 'italic',
      color: '#666666',
      margin: 5,
      marginBottom: 20
    },

    default_text: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
    },

    favorite_container: {
      alignItems: 'center',
      // Alignement des components enfants sur l'axe secondaire, X ici
    },

    favorite_image: {
      width: 40,
      height: 40
    },
    share_touchable_floatingactionbutton: {
      position: 'absolute',
      width: 60,
      height: 60,
      right: 30,
      bottom: 30,
      borderRadius: 30,
      backgroundColor: '#e91e63',
      justifyContent: 'center',
      alignItems: 'center'
    },
    share_image: {
      width: 30,
      height: 30
    }
})

const mapStateToProps = (state) => {
  return{
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmDetail)