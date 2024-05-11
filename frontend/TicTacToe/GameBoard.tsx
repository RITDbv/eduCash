import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Cell } from "./Cell";
import GradientBackground from "../theming/GradientBackground";

const initialBoardState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

export const GameBoard: React.FC = () => {
  const navigation = useNavigation();
  const [board, setBoard] = useState(initialBoardState);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [playerSymbol, setPlayerSymbol] = useState("");
  const [computerSymbol, setComputerSymbol] = useState("");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      // Reset the game state when navigating away from the game board
      setBoard(initialBoardState);
      setIsPlayerTurn(true);
      setWinner("");
    });

    return unsubscribe;
  }, [navigation]);

  const chooseSymbol = (symbol: string) => {
    setPlayerSymbol(symbol);
    setComputerSymbol(symbol === "X" ? "O" : "X");
  };

  const handleCellPress = (row: number, col: number) => {
    if (board[row][col] === "" && !winner) {
      const newBoard = [...board];
      newBoard[row][col] = isPlayerTurn ? playerSymbol : computerSymbol;
      setBoard(newBoard);
      setIsPlayerTurn(!isPlayerTurn);
      checkForWinner(newBoard);
    }
  };

  const checkForWinner = (board: string[][]) => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] !== "" &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        if (board[i][0] === playerSymbol) {
          setBoard(initialBoardState);
          setIsPlayerTurn(true);
          setWinner("");
          navigation.navigate("WinScreen");
        } else {
          setBoard(initialBoardState);
          setIsPlayerTurn(true);
          setWinner("");
          navigation.navigate("LoseScreen");
        }
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] !== "" &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        if (board[0][i] === playerSymbol) {
          setBoard(initialBoardState);
          setIsPlayerTurn(true);
          setWinner("");
          navigation.navigate("WinScreen");
        } else {
          setBoard(initialBoardState);
          setIsPlayerTurn(true);
          setWinner("");
          navigation.navigate("LoseScreen");
        }
        return;
      }
    }

    // Check diagonals
    if (
      board[0][0] !== "" &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      if (board[0][0] === playerSymbol) {
        setBoard(initialBoardState);
        setIsPlayerTurn(true);
        setWinner("");
        navigation.navigate("WinScreen");
      } else {
        setBoard(initialBoardState);
        setIsPlayerTurn(true);
        setWinner("");
        navigation.navigate("LoseScreen");
      }
      return;
    }

    if (
      board[0][2] !== "" &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      if (board[0][2] === playerSymbol) {
        setBoard(initialBoardState);
        setIsPlayerTurn(true);
        setWinner("");
        navigation.navigate("WinScreen");
      } else {
        setBoard(initialBoardState);
        setIsPlayerTurn(true);
        setWinner("");
        navigation.navigate("LoseScreen");
      }
      return;
    }

    // Check for draw
    if (!board.flat().includes("")) {
      setWinner("Draw");
    }
  };

  const restartGame = () => {
    setBoard(initialBoardState);
    setIsPlayerTurn(true);
    setWinner("");
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        {playerSymbol === "" && (
          <View style={styles.symbolSelection}>
            <TouchableOpacity
              style={styles.symbolButton}
              onPress={() => chooseSymbol("X")}
            >
              <Text style={styles.symbolButtonText}>Play as X</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.symbolButton}
              onPress={() => chooseSymbol("O")}
            >
              <Text style={styles.symbolButtonText}>Play as O</Text>
            </TouchableOpacity>
          </View>
        )}
        {playerSymbol !== "" && (
          <>
            <View style={styles.playerInfoContainer}>
              <View style={styles.playerInfo}>
                <View style={styles.playerAvatar}>
                  <Image
                    source={{
                      uri: "https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=512",
                    }} // Replace with your avatar image URL
                    style={styles.avatarImage}
                  />
                </View>
                <View style={styles.playerDetails}>
                  <Text style={styles.playerDetailsText}>Your Name</Text>
                  <Text
                    style={styles.playerDetailsText}
                  >{`You are ${playerSymbol}`}</Text>
                </View>
              </View>
              <Text style={styles.vs}>VS</Text>
              <View style={styles.opponentInfo}>
                <View style={styles.playerDetails}>
                  <Text style={styles.playerDetailsText}>Opponent Name</Text>
                  <Text
                    style={styles.playerDetailsText}
                  >{`Opponent is ${computerSymbol}`}</Text>
                </View>
                <View style={styles.playerAvatar}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/166/166344.png",
                    }} // Replace with your opponent's avatar image URL
                    style={styles.avatarImage}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.title}>
              {winner
                ? `Winner: ${winner}`
                : isPlayerTurn
                  ? "Your Turn"
                  : "Opponent's Turn"}
            </Text>
            <View style={styles.board}>
              {board.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((cell, colIndex) => (
                    <Cell
                      key={`${rowIndex}-${colIndex}`}
                      value={cell}
                      onPress={() => handleCellPress(rowIndex, colIndex)}
                    />
                  ))}
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "#FFFFFF",
  },
  board: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  title: {
    color: "#FFFFFF",
    padding: 20,
  },
  playerInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-around",
    color: "#FFFFFF",
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    color: "#FFFFFF",
  },
  opponentInfo: {
    flexDirection: "row",
    alignItems: "center",
    color: "#FFFFFF",
  },
  playerAvatar: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40, // Half of the desired avatar width/height
    overflow: "hidden", // Ensures the image stays within the circle
    marginRight: 10,
    marginLeft: 10,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // Same as the container's borderRadius
  },
  playerDetails: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  playerDetailsText: {
    color: "#FFFFFF",
  },
  vs: {
    color: "#FFFFFF",
    fontSize: 20,
    marginBottom: 10,
  },
  symbolSelection: {
    flexDirection: "row",
    marginBottom: 20,
  },
  symbolButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    margin: 5,
  },
  symbolButtonText: {
    fontSize: 18,
  },
});

export default GameBoard;
