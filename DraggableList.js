import React, { useState } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Text,
} from "react-native";

const CIRCLE_RADIUS = 30;

const Draggable = () => {
  const [pan] = useState(new Animated.ValueXY());
  const [opacity] = useState(new Animated.Value(1));
  const [showDraggable, setShowDraggable] = useState(true);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: pan.x, dy: pan.y }
    ]),
    onPanResponderRelease: (e, gesture) => {
      if (isDropArea(gesture)) {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
        }).start(() =>
          setShowDraggable(false)
        );
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
        }).start();
      }
    },
  });

  const isDropArea = (gesture) => {
    return gesture.moveY < 200;
  };

  const panStyle = {
    transform: pan.getTranslateTransform(),
    opacity: opacity,
  };

  if (!showDraggable) return null;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[panStyle, styles.circle]}
    />
  );
};

const DraggableList = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dropZone}>
        <Text style={styles.text}>Drop them here!</Text>
      </View>
      <View style={styles.ballContainer} />
      <View style={styles.row}>
        <Draggable />
        <Draggable />
        <Draggable />
        <Draggable />
        <Draggable />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  ballContainer: {
    height: 200,
  },
  row: {
    flexDirection: "row",
  },
  dropZone: {
    height: 200,
    backgroundColor: "#00334d",
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});

export default DraggableList;
