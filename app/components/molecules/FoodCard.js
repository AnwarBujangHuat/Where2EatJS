import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import nasiAyam from 'images/salad.jpg';
import edit from 'images/editing.png';
import Delete from 'images/bin.png';
import FastImage from 'react-native-fast-image';
import { GStyles } from 'configs/Styles';
import { colors } from 'configs/Const';

export const FoodCard = ({
  onPress,
  name,
  price,
  image,
  desc,
  editable = false,
  onPressDelete,
  onPressEdit,
}) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
          <View>
            <ImageBackground
              source={image !== undefined ? { uri: image } : nasiAyam}
              style={{ height: 160 }}
              resizeMode={FastImage.resizeMode.cover}
              blurRadius={editable ? 10 : 0}>
              <View style={styles.containerPrice}>
                <Text style={styles.textPrice}>{'RM ' + price}</Text>
              </View>
              {editable && (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 5,
                    marginTop: 20,
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={onPressDelete}>
                    <Image style={styles.iconButton} source={Delete} />
                    <Text style={styles.textButton}>Delete</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttonEdit}
                    onPress={onPressEdit}>
                    <Image style={styles.iconButton} source={edit} />
                    <Text style={styles.textButton}>Edits</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ImageBackground>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{name}</Text>
              <Text numberOfLines={3} style={styles.desc}>
                {desc}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  iconCategory: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  iconButton: {
    width: 16,
    height: 16,
    tintColor: 'white',
    marginStart: 5,
    alignSelf: 'center',
  },
  container: {
    ...GStyles.shadowContainer,
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
  },
  textButton: {
    padding: 5,
    color: colors.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 14,
  },
  card: {
    width: 220,
    height: 260,
    alignSelf: 'baseline',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  titleContainer: {
    padding: 10,
  },
  desc: {
    color: colors.white,
    paddingTop: 5,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkPurple,
  },
  containerIcon: {
    flexDirection: 'row',
    marginTop: 5,
  },
  containerPrice: {
    flexDirection: 'row',
    borderRadius: 20,
    margin: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: colors.bg,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginStart: 10,
    marginTop: 5,
  },

  textPrice: {
    padding: 2,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  buttonEdit: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginStart: 5,
    backgroundColor: colors.primary,
    borderRadius: 15,
  },
  buttonDelete: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginEnd: 5,
    backgroundColor: 'red',
    borderRadius: 15,
  },
});
