
import { useState } from "react";
import HostBoard from "./HostBoard";
import PlayerJoin from "./PlayerJoin";
import { Toaster } from "react-hot-toast";


export default function App() {
  const [mode, setMode] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setMode("host")}>Host</button>
      <button onClick={() => setMode("player")}>Player</button>


      {/* {mode === "host" ? <HostBoard /> : mode === "player" ? <PlayerJoin /> : <p>Select Host or Player</p>} */}
      {mode === "host" ? <HostBoard /> : <PlayerJoin />}
      <Toaster position="top-right" />
    
    </div>
  );
}
