import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import MapIcon from "../icons/MapIcon";
import ListIcon from "../icons/ListIcon";
import TrapezoidBackground from "./TrapezoidBackground";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import CircleButton from "./CircleButton";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import { evenEmitter } from "@/utils/EventEmitter";

const TabbarItems = () => {
  const { width, height } = useApplicationDimensions();
  const trapezoidWidth = width * 0.68;
  const trapezoidHeight = height * 0.12;
  const circleRadius = (trapezoidHeight * 0.51) / 2;
  const buttonCenterX = width / 2 - circleRadius;
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 32,
      }}
    >
      <Pressable onPress={() => evenEmitter.emit("locationEvent")}>
        <MapIcon />
      </Pressable>
      <TrapezoidBackground width={trapezoidWidth} height={trapezoidHeight} />
      <Pressable
        style={{
          ...StyleSheet.absoluteFillObject,
          left: buttonCenterX,
          top: 12,
          width: circleRadius * 2,
          height: circleRadius * 2,
        }}
      >
        {({ pressed }) => (
          <CircleButton radius={circleRadius} pressed={pressed} />
        )}
      </Pressable>
      <Link href="/list" asChild>
        <Pressable>
          <ListIcon />
        </Pressable>
      </Link>
    </View>
  );
};

export default TabbarItems;

const styles = StyleSheet.create({});
