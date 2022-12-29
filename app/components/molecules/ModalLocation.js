import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import GooglePlacesInput from './GooglePlacesInput';
import MapView, { Marker } from 'react-native-maps';
import { colors } from '../../configs/Const';
import { GStyles } from '../../configs/Styles';

const { width } = Dimensions.get('window');

export const ModalLocation = ({
  submitLocation,
  isModalVisible,
  closeModal,
}) => {
  const [location, setLocation] = useState('Restaurant Location');
  const [latLong, setLatLong] = useState({ latitude: 3.16, longitude: 101.73 });
  const mapRef = React.createRef();
  const onResult = ({ data, details }) => {
    const { location: locInfo } = details.geometry;
    const latitude = locInfo.lat;
    const longitude = locInfo.lng;
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
    setLatLong({ latitude: latitude, longitude: longitude });
    setLocation(data.description);
  };
  return (
    <>
      {{ isModalVisible } && (
        <SafeAreaView style={styles.screen}>
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => closeModal()}
            onDismiss={closeModal}>
            <View style={styles.modalView}>
              <View
                style={{
                  width: 300,
                  height: 390,
                  zIndex: 2,
                  alignSelf: 'center',
                }}>
                <Text style={styles.header}>{'Pick Restaurant Location'}</Text>
                <Text style={styles.desc}>{location}</Text>
                <GooglePlacesInput onResult={onResult} />
              </View>
              <MapView
                style={styles.mapView}
                ref={mapRef}
                initialRegion={{
                  latitude: 3.16,
                  longitude: 101.73,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }}
                liteMode={true}>
                <Marker
                  pinColor={colors.primary}
                  coordinate={{
                    latitude: latLong.latitude,
                    longitude: latLong.longitude,
                  }}
                />
              </MapView>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  submitLocation({ location: location, latlong: latLong })
                }>
                <Text style={styles.buttonText}>Add Location</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  mapView: {
    height: 280,
    width: 300,
    zIndex: 0,
    alignSelf: 'center',
    position: 'absolute',
    top: '33%',
  },
  button: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    textTransform: 'uppercase',
    marginTop: 40,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'normal',
  },
  container: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginTop: 10,
    ...GStyles.shadowContainer,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 0,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  modalView: {
    padding: 20,
    height: 500,
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    width: width * 0.9,
    backgroundColor: colors.bg,
    // backgroundColor: '$primaryColor',
    borderRadius: 7,
  },

  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkPurple,
    marginBottom: 5,
  },
  desc: {
    color: colors.white,
    fontSize: 14,
    height: 50,
    marginBottom: 10,
  },
});
