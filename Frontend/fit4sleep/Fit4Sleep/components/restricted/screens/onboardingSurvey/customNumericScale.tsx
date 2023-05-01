import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {appColorTheme} from "../../../../constants/colors";

export interface ICustomNumericScaleProps {
    numOfSteps: number;
    setFun: (numVal: number) => any;
}

const CustomNumericScale = (props: ICustomNumericScaleProps) => {
    const [numOfSteps, setNumOfSteps] = useState<number>(props.numOfSteps);
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

    return (
        <View style={{
            backgroundColor: "white", flexDirection: "row",
            alignItems: "center", width: "100%", height: 36,
            borderRadius: 10
        }}>
            {
                [...Array(numOfSteps)].map((element: any, index: number) => {

                    const isStart: boolean = index === 0;
                    const isEnd: boolean = index === numOfSteps - 1;
                    const borderRadius: number = 10;

                    return (
                        <TouchableOpacity key={index} style={{
                            height: "100%",
                            borderTopStartRadius: isStart ? borderRadius : undefined,
                            borderBottomStartRadius: isStart ? borderRadius : undefined,
                            borderTopEndRadius: isEnd ? borderRadius : undefined,
                            borderBottomEndRadius: isEnd ? borderRadius : undefined,
                            borderWidth: 1,
                            backgroundColor: activeIndex === index ? appColorTheme.primaryColor : "white",
                            borderStartWidth: !isStart ? 0 : 1,
                            width: `${100 / numOfSteps}%`,
                            justifyContent: "center",
                            alignItems: "center",
                            borderColor: activeIndex === index ? appColorTheme.primaryColor : appColorTheme.inactiveColor,
                        }}

                                          onPressIn={() => {
                                              setActiveIndex(index);
                                          }}
                                          onPress={() => {
                                              props.setFun(index + 1)
                                          }}
                        >
                            <Text style={{
                                color: activeIndex === index ? "white" : appColorTheme.inactiveColor,
                                fontWeight: "bold"
                            }}>{index + 1}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}
const styles = StyleSheet.create({});
export default CustomNumericScale;