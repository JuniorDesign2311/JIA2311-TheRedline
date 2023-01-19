import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const States = ({ state, setState }) => {
  const states = [
    "Alaska",
    "Alabama",
    "Arkansas",
    "American Samoa",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "District of Columbia",
    "Delaware",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Iowa",
    "Idaho",
    "Illinois",
    "Indiana",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Massachusetts",
    "Maryland",
    "Maine",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Mississippi",
    "Montana",
    "North Carolina",
    "North Dakota",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "Nevada",
    "New York",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Virgin Islands",
    "Vermont",
    "Washington",
    "Wisconsin",
    "West Virginia",
    "Wyoming",
  ];
return (
    <View style={styles.container}>
    <Text> State </Text> 
    <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 8 }}>
      <SelectDropdown
        data={states}
        onSelect={(state) => {
          setState(state);
        }}
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"black"}
              size={18}
            />
          );
        }}
        defaultButtonText="Select a state"
        dropdownIconPosition={"right"}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
        selectedRowStyle={styles.selectedText}
        buttonTextAfterSelection={(selectedItem) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    backgroundColor: "#FAFBFC",
    height: 40,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 4,
    width: "90%",
  },
  dropdown1BtnTxtStyle: {
    textAlign: "left",
    fontSize:15,
    color: "#D3D3D3"
  },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF", borderRadius: 4 },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "black", textAlign: "left", fontSize: 15},
  selectedText: {color: "black"}
});

export default States;