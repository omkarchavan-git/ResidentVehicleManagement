package com.AutoTrack.helperClass;


public class ResidentHelper {

    // Helper class to verify the input string and other inputs validation  for db
    //making const private so that restriction will be added
    private ResidentHelper (){};

    // method to verify name
    public static String isValidName(String name) {

        if (name == null) {
            throw new IllegalArgumentException("Name should not be empty");
        } else {
            name = name.trim().toLowerCase();
            name = name.replaceAll("[^A-Za-z ]", "").replaceAll("\\s+", "");
            return name;
        }
    }

}
