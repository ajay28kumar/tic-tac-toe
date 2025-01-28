import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { TicTacToeContainer } from "./TicTacToeContainer";

const TicTacToe = ({ size = 3 }) => {
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <TicTacToeContainer size={size} />
      </CardContent>
    </Card>
  )
}

export default TicTacToe;