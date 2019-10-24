/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Modal,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import axios from 'axios'
import { Fonts } from './src/utilis/Fonts'
import MapView from 'react-native-maps';
import { Rating, AirbnbRating } from 'react-native-ratings';
import upArrow from './assets/up_arrow.png'
import downArrow from './assets/down_arrow.png'

const URL = "http://api.doctory.co/restserver/api/getHospital"
const data = { "id": "50", "user_id": "429", "isEnglish": "1" }

var ClinicName, address, workingHours, services, ClinicImage, phone, insurance_companies, spec, doctors, doctors2;

export default class ProfileScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      content: false,
      isLoading: true,
      dataSource: null,
      isModalVisible: false,

    }
  }

  ///handling the view of the rest for doctors images.
  componentHideAndShow = () => {
    this.setState(previousState => ({ content: !previousState.content }))
  }

  /////related to the Modal
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };


  componentDidMount = async () => {
    await axios.post(URL, data)
      .then((response) => {
        console.log(response.data[0])
        ClinicName = response.data[0].name
        address = response.data[0].address + ", P.O BOX:" + response.data[0].area_id + ", " + response.data[0].area_name + ", " + response.data[0].city_name
        ClinicImage = response.data[0].image
        workingHours = response.data[0].working_hours
        services = response.data[0].services.split(',')
        spec = response.data[0].spec.split(',')
        phone = response.data[0].phone
        doctors = response.data[0].doctors

        insurance_companies = response.data[0].insurance_companies
        this.setState({
          isLoading: false,
          dataSource: response.data[0],
          //Capitalize

        })

      });
  }

  ////capitalizing the first letter of given word.
  Capitalize() {
    for (let idoc = 0; idoc <= length(doctors); idoc++) {
      If(i <= 4)
      {
        doctors2.append(doctors[i])
      }
    }
  }


  render() {
    ////trying to make the design responsive as possible.
    var deviceHeight = Dimensions.get('window').height;
    var deviceWidth = Dimensions.get('window').width;
    var ArrowDirection = this.state.content ? upArrow : downArrow;


    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View style={styles.container}>
{/* 
        this is working good but it only have a problem with my API key, its not related to Billing account */}
        <View style={{ width: deviceWidth, height: deviceHeight / 4, marginRight: 50 }}>
          <MapView

            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
          </MapView>


        </View>



        <View style={{ width: deviceWidth, height: deviceHeight - deviceHeight / 3, backgroundColor: "#ffffff", borderRadius: 20, marginTop: -30 }}>
          <Image source={require('./assets/like.png')} style={{ alignSelf: 'flex-end', tintColor: '#000000', marginTop: 10, marginRight: 10, width: 20, height: 20, marginBottom: 15 }}></Image>
          <Image source={{ uri: ClinicImage }} style={{ borderRadius: 5, alignSelf: 'flex-start', backgroundColor: '#000000', marginLeft: 20, marginTop: -70, width: 95, height: 95 }}></Image>



          <ScrollView>

            <View style={styles.feed}>
              <Text style={styles.ClinicName}>
                {ClinicName}
              </Text>

              {/*  handle the view for the rating and etc..., your respond from api returns null on user star s and rating, which actually i cant work with it or how to deal with null, so i put it as hardcoded */}
              <View style={{
                width: deviceWidth - 20, height: 50, backgroundColor: '#ffffff'
                , flexDirection: 'row'
              }}>

                <View style={{ flex: 4, height: 30, width: null, margin: 10 }}>
                  <TouchableOpacity onPress={this.toggleModal}>
                    <Rating
                      type='star'
                      ratingCount={5}
                      imageSize={20}
                      startingValue={2}
                      readonly={true}
                    />
                    <Modal visible={this.state.isModalVisible}
                      animationType={"slide"} transparent={true}
                      blurRadius={4}
                      onSwipeComplete={() => this.setState({ isModalVisible: false })}
                      swipeDirection="left"
                    >

                      <TouchableOpacity
                        style={styles.modalContainer}
                        activeOpacity={1}
                        onPressOut={this.toggleModal}
                      >
                        <TouchableWithoutFeedback>
                          <View style={styles.modal}>
                            <Text style={styles.modalTitle}> Rate The Clinic</Text>
                            <Text style={styles.modalInfo}> what is your over all impression and rate of this clinic ?</Text>
                            <Rating
                              type='star'
                              ratingCount={5}
                              imageSize={30}
                              startingValue={0}
                              readonly={false}
                            />
                          </View>
                        </TouchableWithoutFeedback>
                      </TouchableOpacity>
                    </Modal>
                  </TouchableOpacity>
                </View>


                {/* Rating View here  */}
                <View style={{ flex: 2, height: 30, width: null, flexDirection: 'row', marginLeft: 90, marginTop: 10 }}>
                  <Rating
                    type='star'
                    ratingCount={1}
                    imageSize={20}
                    startingValue={1}
                    ratingColor="#a6a6a6"
                    ratingBackgroundColor="#a6a6a6"
                    readonly={true}
                  ></Rating>
                  <Text style={{ marginLeft: 5, color: '#a6a6a6' }}>5</Text>

                </View>
                <View style={{ flex: 2, height: 30, width: null, flexDirection: 'row', marginTop: 10, marginRight: 20 }}>
                  <Image source={require('./assets/profile.png')} style={{ tintColor: '#000000', width: 20, height: 20 }}></Image>
                  <Text style={{ marginLeft: 4, color: '#a6a6a6' }}>3 Total</Text>

                </View>

              </View>

              {/*  WorkingHours */}

              <View style={{ marginTop: 10, flexDirection: 'column' }}>
                <Text style={styles.Title}>Working Hours</Text>
                <Text style={styles.Information}>
                  {workingHours} </Text>
              </View>


              {/*  Address */}


              <View style={{ marginTop: 10, flexDirection: 'column' }}>
                <Text style={styles.Title}>Address</Text>
                <Text style={styles.Information}>{address}</Text>
              </View>


              {/*  Doctors Working Here */}

              <View style={{ marginTop: 10, flexDirection: 'column' }}>
                <Text style={styles.Title}>Doctors Working Here</Text>


                {/*  this will work as follows, since my screen can take 5 images per line, it will show the first 5 images then by pressing button it will show the rest. */}

                <View style={{ flex: 4, flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'flex-start', flexDirection: "row", alignItems: 'center', flexWrap: 'wrap', marginTop: 10, marginLeft: 26 }}>
                    <View style={{ backgroundColor: '#ffffff', borderRadius: 200, height: 50, width: 50, marginRight: 10, justifyContent: 'center', elevation: 5 }}>
                      <Image source={{ uri: doctors[0].image }}
                        style={{ width: 40, height: 40, borderRadius: 400 / 2, alignSelf: 'center' }}
                      />
                    </View>

                    <View style={{ backgroundColor: '#ffffff', borderRadius: 200, height: 50, width: 50, marginRight: 10, justifyContent: 'center', elevation: 5 }}>
                      <Image source={{ uri: doctors[1].image }}
                        style={{ width: 40, height: 40, borderRadius: 400 / 2, alignSelf: 'center' }}
                      />
                    </View>

                    <View style={{ backgroundColor: '#ffffff', borderRadius: 200, height: 50, width: 50, marginRight: 10, justifyContent: 'center', elevation: 5 }}>
                      <Image source={{ uri: doctors[2].image }}
                        style={{ width: 40, height: 40, borderRadius: 400 / 2, alignSelf: 'center' }}
                      />
                    </View>

                    <View style={{ backgroundColor: '#ffffff', borderRadius: 200, height: 50, width: 50, marginRight: 10, justifyContent: 'center', elevation: 5 }}>
                      <Image source={{ uri: doctors[3].image }}
                        style={{ width: 40, height: 40, borderRadius: 400 / 2, alignSelf: 'center' }}
                      />
                    </View>

                    <View style={{ backgroundColor: '#ffffff', borderRadius: 200, height: 50, width: 50, marginRight: 10, justifyContent: 'center', elevation: 5 }}>
                      <Image source={{ uri: doctors[3].image }}
                        style={{ width: 40, height: 40, borderRadius: 400 / 2, alignSelf: 'center' }}
                      />
                    </View>
                  </View>


                  <TouchableOpacity style={{
                    width: 20, height: 20, marginRight: 4, flex: 1, borderRadius: 5, justifyContent: 'center',
                    alignContent: 'center',
                  }} onPress={this.componentHideAndShow}>
                    <View style={{ backgroundColor: '#ffffff', borderRadius: 200, height: 15, width: 15, marginTop: 10, marginBottom: 10, justifyContent: 'center', elevation: 5 }}>
                      <Image source={ArrowDirection} style={{ alignSelf: 'center', tintColor: '#000000', width: 10, height: 10 }}></Image>
                    </View>
                  </TouchableOpacity>

                </View>


                {
                  // Display the content in screen when state object "content" is true.
                  // Hide the content in screen when state object "content" i false.
                  this.state.content ?
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={doctors}
                      numColumns={5}
                      keyExtractor={item => item.id}
                      contentContainerStyle={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: -33, marginBottom: 10 }}
                      renderItem={({ item }) =>
                        <View style={{ backgroundColor: '#ffffff', borderRadius: 200, height: 50, width: 50, marginRight: 10, justifyContent: 'center', marginTop: 10, elevation: 5, marginBottom: 5 }}>
                          <Image source={{ uri: item.image }}
                            style={{ width: 40, height: 40, borderRadius: 400 / 2, alignSelf: 'center' }}
                          />
                        </View>
                      }

                    ></FlatList>
                    : null
                }
              </View>

              {/*  this is a const, it will shows 2 per line what ever the screen width, it will fit the width, if the total count was odd, the last one will be centered. */}

              <View style={{ marginTop: 10, flexDirection: 'column' }}>
                <Text style={styles.Title}>Available Specialties</Text>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={spec}
                  numColumns={2}
                  contentContainerStyle={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}
                  renderItem={({ item }) =>
                    <TouchableOpacity style={{
                      backgroundColor: '#ffa500', width: deviceWidth / 2 - 45, height: 70, borderRadius: 5,
                      margin: 10, justifyContent: 'center', alignContent: 'center'
                    }}>
                      <Text style={{ alignSelf: 'center', color: '#FFFFFF' }}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                    </TouchableOpacity>
                  }

                ></FlatList>
              </View>






              <View style={{ marginTop: 10, flexDirection: 'column' }}>
                <Text style={styles.Title}>Services</Text>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={services}
                  renderItem={({ item }) =>
                    <Text style={styles.Information}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                  }
                ></FlatList>
              </View>


              <View style={{ marginTop: 10, flexDirection: 'column' }}>
                <Text style={styles.Title}> Insurance Companies</Text>
                <Text style={styles.Information}>
                  {insurance_companies} </Text>
              </View>


            </View>
          </ScrollView>
        </View>





        <View style={{ width: deviceWidth - 20, height: 4, flexDirection: 'row', flex: 5, marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
          <TouchableOpacity style={{
            backgroundColor: '#148d14', width: null, flex: 4, marginLeft: 4, marginTop: 5, marginRight: 4, borderRadius: 5, flexDirection: 'row',
            justifyContent: 'center', alignContent: 'center'}}
            onPress={() => { Linking.openURL('tel:{phone}'); }}>
            <Image source={require('./assets/call.png')} style={{ alignSelf: 'center', tintColor: '#ffffff', width: 20, height: 20 }}></Image>
            <Text style={{ alignSelf: 'center', color: '#FFFFFF' }}> call Clinic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#5995da', width: null, flex: 1, marginRight: 4, marginLeft: 4, marginTop: 5, borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
            <Image source={require('./assets/car.png')} style={{ alignSelf: 'center', tintColor: '#ffffff', marginTop: 10, marginBottom: 10, width: 20, height: 20 }}></Image>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff'

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  feed: {
    marginHorizontal: 16,
    marginTop: 20,
    flexDirection: 'column'

  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16
  },
  ClinicName: {
    fontSize: 25,
    fontFamily: Fonts.Capin,
    fontWeight: 'bold',
    alignSelf: "center",
    color: '#00b8ff'
  },
  Title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: "flex-start",
    color: '#00b8ff',
    marginLeft: 15
  },
  Information: {
    fontSize: 14,
    alignSelf: "flex-start",
    color: '#a6a6a6',
    marginLeft: 30
  },
  ratingsView: {
    marginTop: 10,
    flexDirection: 'row',
    flex: 5,
    backgroundColor: '#000000'

  },
  RatingStars: {
    flex: 3,
    alignSelf: 'flex-start',
    backgroundColor: '#000000'

  },
  modal: {
    width: 350,
    height: 200,
    marginRight: 20,
    marginLeft: 28,
    marginTop: 35,
    backgroundColor: '#ffffff',
    borderRadius: 5

  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: "center",
    color: '#00b8ff',
    marginTop: 35

  },
  modalInfo: {
    fontSize: 14,
    marginBottom: 20,
    alignSelf: "center",
    color: '#a6a6a6',
  },
  modalContainer: {
    backgroundColor: 'rgba(0 , 0, 0 , 0.8)',
    width: 5000,
    height: 5000
  }
});