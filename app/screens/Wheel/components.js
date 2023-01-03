import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text as RNText,
  View,
} from 'react-native';
import Svg, {
  G,
  Path,
  Text,
} from 'react-native-svg';
import { BackButton } from 'atoms/BackButton';
import { ItemListRestaurant } from 'molecules/ItemListRestaurant';
import { ModalWinner } from 'molecules/ModalWinner';
import * as d3Shape from 'd3-shape';
import { colorPalette } from './ColorPalette';
import {
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import color from 'randomcolor';
import { snap } from '@popmotion/popcorn';
import { colors } from 'configs/Const';
import LottieView from 'lottie-react-native';
import arrow from 'lottie/arrows.json';
import { GStyles } from 'configs/styles';

const { width } = Dimensions.get('screen');
const knobFill = color({ hue: 'purple' });
const wheelSize = width * 0.9;
const fontSize = 20;
const oneTurn = 360;
const _angle = new Animated.Value(0);
export const WheelComponents = props => {
  const {
    restaurant,
    isEnabled,
    setFinished,
    isDirection,
    setDirection,
    isModalVisible,
    setModalVisible,
    setSelectedRestaurant,
    isFinished,
    selectedRestaurant,
    angleBySegment,
    angleOffset,
    onPress,
    closeModal,
    goBackHome,
    goToMenu,
    setisEnabled,
    oneTurn,
    numberOfSegments,
  } = props;
  let angle = 0;
  _angle.addListener(event => {
    angle = event.value;
  });
  const makeWheel = () => {
    const data = Array.from({ length: numberOfSegments }).fill(1);
    const arcs = d3Shape.pie()(data);
    const colorRepeater = Math.floor(2);
    let colorPalettes = colorPalette;
    if (colorRepeater >= 1) {
      for (let i = 0; i < colorRepeater; i++) {
        colorPalettes = [...colorPalettes, ...colorPalette];
      }
    }
    return arcs.map((arc, index) => {
      const instance = d3Shape.arc().padAngle(0.01).outerRadius(width / 2).innerRadius(20);
      return {
        path: instance(arc),
        color: colorPalettes[index],
        value: index + 1,
        centroid: instance.centroid(arc),
      };
    });
  };
  const _wheelPaths = makeWheel();

  const _onPan = ({ nativeEvent }) => {
    const { velocityY, velocityX } = nativeEvent;

    if (nativeEvent.state === State.ACTIVE) {
      velocityX > 0 ? setDirection('Left') : setDirection('Right');
      setisEnabled(false);
    }
    if (nativeEvent.state === State.END) {
      Animated.decay(_angle, {
        velocity: velocityY / 1000,
        deceleration: 0.999,
        useNativeDriver: true,
      }).start(() => {
        _angle.setValue(angle % oneTurn);
        const snapTo = snap(oneTurn / numberOfSegments);
        Animated.timing(_angle, {
          toValue: snapTo(angle),
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          const winnerIndex = _getWinnerIndex();
          setisEnabled(true);
          setFinished(true);
          setModalVisible(true);
          setSelectedRestaurant(restaurant[winnerIndex]);
        });
      });
    }
  };
  const _getWinnerIndex = () => {
    const deg = Math.abs(Math.round(angle % oneTurn));
    const tempIndex = Math.floor(deg / angleBySegment);
    if (isDirection === 'Right') {
      return tempIndex;
    } else {
      if (tempIndex !== 0) {
        return numberOfSegments - tempIndex;
      }
      return 0;
    }
  };
  const _renderKnob = () => {
    const knobSize = 30;
    const YOLO = Animated.modulo(
      Animated.divide(
        Animated.modulo(Animated.subtract(_angle, angleOffset), oneTurn),
        new Animated.Value(angleBySegment),
      ),
      isDirection === 'Right' ? -1 : 1,
    );

    return (
      <Animated.View
        style={{
          width: knobSize,
          height: knobSize * 2,
          justifyContent: 'flex-end',
          zIndex: 1,
          transform: [
            {
              rotate: YOLO.interpolate({
                inputRange: [-1, -0.5, -0.0001, 0.0001, 0.5, 1],
                outputRange: [
                  '0deg',
                  '0deg',
                  '35deg',
                  '-35deg',
                  '0deg',
                  '0deg',
                ],
              }),
            },
          ],
        }}>
        <Svg
          width={knobSize}
          height={(knobSize * 100) / 57}
          viewBox={'0 0 57 100'}
          style={{ transform: [{ translateY: 8 }] }}>
          <Path
            d="M28.034,0C12.552,0,0,12.552,0,28.034S28.034,100,28.034,100s28.034-56.483,28.034-71.966S43.517,0,28.034,0z   M28.034,40.477c-6.871,0-12.442-5.572-12.442-12.442c0-6.872,5.571-12.442,12.442-12.442c6.872,0,12.442,5.57,12.442,12.442  C40.477,34.905,34.906,40.477,28.034,40.477z"
            fill={knobFill}
          />
        </Svg>
      </Animated.View>
    );
  };
  const _renderSvgWheel = () => {
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.rowContainer}>
            <BackButton onPress={goBackHome} />
            <RNText style={styles.title}>{'Wheel Of Fortune'}</RNText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <LottieView source={arrow} autoPlay={true} style={{
              height: 60,
              width: 60,
              paddingBottom: 5,
              transform: [{ rotate: '90deg' }],
            }} />
            <RNText style={styles.title}>{'Swipe To The LEFT or RIGHT'}</RNText>
            <LottieView source={arrow} autoPlay={true} style={{
              height: 60,
              width: 60,
              marginTop: -5,
              transform: [{ rotate: '180deg' }],
            }}>

            </LottieView>
          </View>
          <View style={styles.wheel}>
            {_renderKnob()}
            <Animated.View
              style={
                isDirection === 'Right' ? styles.swipeRight : styles.swipeLeft
              }>
              <Svg
                width={wheelSize}
                height={wheelSize}
                viewBox={`0 0 ${width} ${width}`}
                style={{ transform: [{ rotate: `-${angleOffset}deg` }] }}>
                <G y={width / 2} x={width / 2}>
                  {_wheelPaths.map((arc, i) => {
                    const [x, y] = arc.centroid;
                    return (
                      <G key={`arc-${i}`}>
                        <Path d={arc.path} fill={arc.color} />
                        <G
                          rotation={
                            (i * oneTurn) / numberOfSegments + angleOffset
                          }
                          origin={`${x}, ${y}`}>
                          <Text
                            x={x}
                            y={y - 35}
                            fontWeight={'bold'}
                            fill="#fff"
                            textAnchor="middle"
                            fontSize={fontSize}>
                            {i + 1}
                          </Text>
                        </G>
                      </G>
                    );
                  })}
                </G>
              </Svg>
            </Animated.View>
          </View>
          <FlatList
            style={{ marginTop: 15 }}
            data={restaurant}
            renderItem={({ item, index }) => {
              return (
                <ItemListRestaurant
                  name={item.restaurant}
                  category={item.category}
                  onPress={() => onPress(index)}
                  index={index}
                />
              );
            }}
            showsHorizontalScrollIndicator={false}
          />
          {isModalVisible && isEnabled && (
            <ModalWinner
              closeModal={closeModal}
              isModalVisible={isModalVisible}
              goToMenu={goToMenu}
              selectedRestaurant={selectedRestaurant}
              isFinished={isFinished}
            />
          )}
        </SafeAreaView>
      </>
    );
  };
  return (
    <PanGestureHandler onHandlerStateChange={_onPan} enabled={isEnabled}>
      <View style={styles.container}>{_renderSvgWheel()}</View>
    </PanGestureHandler>
  );
};
const styles = StyleSheet.create({
  container: {
    ...GStyles.screens,
    justifyContent: 'center',
  },
  swipeRight: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [
      {
        rotate: Animated.multiply(_angle, -1).interpolate({
          inputRange: [-oneTurn, 0, oneTurn],
          outputRange: [`-${oneTurn}deg`, '0deg', `${oneTurn}deg`],
        }),
      },
    ],
  },
  swipeLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [
      {
        rotate: _angle.interpolate({
          inputRange: [-oneTurn, 0, oneTurn],
          outputRange: [`-${oneTurn}deg`, '0deg', `${oneTurn}deg`],
        }),
      },
    ],
  },
  rowContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    margin: 10,
  },
  wheel: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowOffset: { width: -2, height: 2 },
    shadowColor: colors.primary,
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
});
