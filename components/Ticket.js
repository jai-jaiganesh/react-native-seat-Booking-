import React, { useState } from "react";
// import clsx from "clsx";
import Unorderedlist from "react-native-unordered-list";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  LinearGradient,
  Alert,
} from "react-native";
// import { Picker } from "react-native-web";
import { Picker } from "@react-native-picker/picker";
import { logToConsole } from "react-native/Libraries/Utilities/RCTLog";
const movies = [
  {
    name: "Beast",
    price: 120,
    occupied: [],
  },
  {
    name: "Valimai",
    price: 120,
    occupied: [],
  },
  {
    name: "Jai Bhim",
    price: 130,
    occupied: [],
  },
  {
    name: "Hey ram",
    price: 150,
    occupied: [],
  },
];

const seats = Array.from({ length: 8 * 8 }, (_, i) => i);

const Ticket = () => {
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  return (
    <View>
      <Movies
        movie={selectedMovie}
        onMovieChange={(movie) => {
          setSelectedSeats([]);
          setSelectedMovie(movie);
        }}
      />
      <ShowCase />

      <Cinema
        movie={selectedMovie}
        selectedSeats={selectedSeats}
        onSelectedSeatsChange={(selectedSeats) =>
          setSelectedSeats(selectedSeats)
        }
      />
      <Text style={styles.info}>
        You have selected{" "}
        <Text style={styles.count}>{selectedSeats.length}</Text> seats for the
        price of{" "}
        <Text style={styles.total}>
          {selectedSeats.length * selectedMovie.price}
        </Text>
      </Text>
      <View style={styles.container}>
        <Button
          title="Book"
          style={styles.button}
          onPress={() => {
            setSelectedMovie({
              ...selectedMovie,
              occupied: [...selectedSeats],
            });
            setSelectedSeats([]);
          }}
        ></Button>
      </View>
    </View>
  );
};
const ShowCase = () => {
  return (
    <View>
      <View style={styles.ShowCase}>
        <Text style={[styles.seat, styles.seat1]}>N/A</Text>
        <Text style={[styles.seat, styles.selected]}>Selected</Text>
        <Text style={[styles.seat, styles.occupied]}>Occupied</Text>
      </View>
    </View>
  );
};
function Movies({ movie, onMovieChange }) {
  return (
    <View style={styles.Movies}>
      <label htmlFor="movie">Select a movie</label>
      <Picker
        id="movie"
        selectedValue={movie.name}
        onValueChange={(value) => {
          onMovieChange(movies.find((movie) => movie.name === value));
        }}
      >
        {movies.map((movie) => (
          <Picker.Item
            key={movie.name}
            label={`${movie.name} (Rs.${movie.price})`}
            value={movie.name}
          />
        ))}
      </Picker>
    </View>
  );
}

function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
  const tempMovieIndex = movies.findIndex((m) => m.name === movie.name);
  movies[tempMovieIndex].occupied = [
    ...movies[tempMovieIndex].occupied,
    ...movie.occupied,
  ];
  movie.occupied = movies[tempMovieIndex].occupied;

  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }

  return (
    <View style={styles.Cinema}>
      <Text style={styles.seats}>
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat);
          const isOccupied = movie.occupied.includes(seat);
          return (
            <View
              tabIndex="0"
              key={seat}
              style={[
                styles.seat,
                styles.box,
                styles.unselected,
                isSelected && styles.selected,
                isOccupied && styles.occupied,
              ]}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
            />
          );
        })}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  App: {
    textAlign: "center",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  },
  seat1: {
    backgroundColor: "grey",
    padding: 5,
  },
  Movies: {
    marginBottom: 24,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "5em",
    height: "30px",
  },
  Movies,
  Picker: {
    appearance: "none",
    backgroundColor: "white",
    fontSize: 14,
    marginLeft: 12,
    borderRadius: 10,
    paddingTop: 6,
    paddingRight: 24,
    paddingLeft: 6,
    paddingBottom: 24,
  },
  seat: {
    display: "inline-block",
    color: "white",
    position: "relative",
  },
  ShowCase: {
    padding: 0,
    listStyle: "none",
    display: "flex ",
    justifyContent: "center",
    backgroundColor: " #3b3b3b",
    flexDirection: "row",
    padding: 12,
    borderRadius: 4,
    color: "#7e7e7e",
  },
  box: {
    width: 20,
    height: 15,
  },
  unselected: {
    backgroundColor: "grey",
  },
  selected: {
    backgroundColor: "green",
    padding: 5,
  },

  occupied: {
    backgroundColor: "red",
    padding: 5,
  },
  Cinema: {
    paddingBottom: 28,
    perspective: 400,
    maxWidth: 250,
    margin: "auto",
    display: "flex",
    placeItems: "center",
    gridGap: 24,
  },

  seats: {
    display: "flex",
    flexSpace: 10,
    gap: 10,
    flexWrap: "wrap",
    alignItems: "Center",
  },
  info: {
    textAlign: "center",
    paddingBottom: 10,
  },
});
export default Ticket;
