import { useEffect, useState,useRef } from "react";
import { socket } from "./socket";
import toast, { Toaster } from "react-hot-toast";
import themes from "./themes";
export default function PlayerJoin() {
  const [playerCode, setPlayerCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [called, setCalled] = useState([]);
  const [current, setCurrent] = useState(null);
  const [claims, setClaims] = useState({});
  const [marked, setMarked] = useState({});
  const [manualMarking, setManualMarking] = useState(true);
  const [allowAutoMark, setAllowAutoMark] = useState(false);

  const emojis = ["🎉", "😂", "👏", "😎", "😤", "😠", "🤬", "🔥", "🙄", "👀"];


  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 360;

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [playersOpen, setPlayersOpen] = useState(false);

  
  const [players, setPlayers] = useState([]);


  const [showThemes, setShowThemes] = useState(false);


  const chatEndRef = useRef(null);

  const sendEmoji = (emoji) => {
  socket.emit("sendEmoji", {
    roomCode,
    playerName,
    emoji,
  });
};



  const sendMessage = () => {
  if (!chatInput.trim()) return;

  socket.emit("player_send_message", {
    roomCode,
    playerCode,
    message: chatInput.trim(),
  });

  setChatInput("");
};




  const themeKeys = Object.keys(themes);
const randomTheme = themeKeys[Math.floor(Math.random() * themeKeys.length)];

const [activeTheme, setActiveTheme] = useState(randomTheme);
 const handleSelect = (themeKey) => {
    setActiveTheme(themeKey);
    onChange && onChange(themes[themeKey]);
  };


const ticketStyle = (theme) => ({
  background: theme.colors.primaryGradient,
  borderRadius: theme.borderRadius,
  padding: theme.padding,
  border: `2px solid ${theme.colors.border}`,
  boxShadow: `0 8px 20px ${theme.colors.shadow}`,
  display: "inline-block",
});





  // Professional claim labels
  const claimLabels = {
  FIRST_FIVE: "Lucky Five",
  FIRST_LINE: "Top Line",
  MIDDLE_LINE: "Middle Line",
  LAST_LINE: "Bottom Line",
  FULL_HOUSE: "💥 Boom House",
};


  // derived numbers
  const lastFive = called.slice(-5);
  const pastNumbers = called.slice(0, -5);

  // Core palette: black / grey / gold
  const colors = {
    bgRoot: "#02040A",
    bgPanel: "#050816",
    bgSection: "#050B12",
    borderSoft: "rgba(148,163,184,0.35)",
    borderStrong: "rgba(75,85,99,0.8)",
    textPrimary: "#F9FAFB",
    textMuted: "#9CA3AF",
    textSoft: "#6B7280",
    gold: "#FACC15",
    goldStrong: "#EAB308",
    goldSoft: "#FEF9C3",
    successBorder: "rgba(34,197,94,0.6)",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: isMobile ? 12 : 20,
    background: "radial-gradient(circle at top, #020617 0%, #02040A 70%, #020617 100%)",
    borderRadius: isMobile ? 14 : 20,
    border: `1px solid ${colors.borderSoft}`,
    boxShadow: "0 30px 80px rgba(0,0,0,0.9)",
    color: colors.textPrimary,
    minHeight: "90vh",
    fontFamily: "system-ui, sans-serif",
  };

  const threeColumnStyle = {
  display: "grid",
  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
  gap: isSmallMobile ? 10 : 16,
};



  const fullWidthCardStyle = {
    background: "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(15,23,42,0.85))",
    borderRadius: 16,
    padding: 24,
    border: `1px solid ${colors.borderStrong}`,
    // maxWidth: 720,
    maxWidth: isSmallMobile ? 20 : 1020,
    
  };


  const thirdCardStyle = {
  background: "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(15,23,42,0.85))",
  borderRadius: 12,
  padding: isSmallMobile ? 8 : 12,
  border: `1px solid ${colors.borderStrong}`,
  display: "flex",
  flexDirection: "column",
};


  const primaryButton = {
    padding: "8px 16px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    background: `linear-gradient(135deg, ${colors.goldSoft}, ${colors.goldStrong})`,
    color: "#020617",
    boxShadow: "0 0 20px rgba(250,204,21,0.45)",
    transition: "all 0.2s ease",
    fontFamily: "system-ui, sans-serif",
  };

const claimButton = (claimType) => ({
  padding: "10px 12px",
  borderRadius: 8,
  border: `1px solid ${colors.borderStrong}`,
  backgroundColor: claims[claimType] ? colors.bgSection : colors.bgRoot,
  color: claims[claimType] ? colors.gold : colors.textPrimary,
  cursor: claims[claimType] ? "default" : "pointer",
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.3,
  margin: 4,
  opacity: claims[claimType] ? 0.6 : 1,
  transition: "all 0.2s ease",
  flex: 1,
  width: isSmallMobile ? "100%" : "auto",
});


 const toggleMark = (ticketIndex, number, rowIndex, colIndex) => {
  if (!number) return;

  setMarked(prev => {
    const key = `${ticketIndex}-${number}-${rowIndex}-${colIndex}`;
    const copy = { ...prev };

    if (copy[key]) {
      delete copy[key];
    } else {
      copy[key] = true;
    }

    return copy;
  });
};



  const currentNumberStyle = {
    width: 100,
    height: 100,
    borderRadius: "50%",
    background: current
      ? `radial-gradient(circle at 30% 30%, ${colors.goldSoft}, ${colors.gold}, #92400e)`
      : "#020617",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: current ? "#020617" : colors.textSoft,
    fontSize: 40,
    fontWeight: 800,
    boxShadow: current
      ? "0 0 40px rgba(250,204,21,0.75)"
      : "0 0 0 rgba(0,0,0,0)",
    border: `3px solid ${colors.gold}`,
    margin: "0 auto 8px",
  };

  const lastFiveStyle = {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: `2px solid ${colors.successBorder}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `radial-gradient(circle at 30% 30%, #bbf7d0, #22c55e, #166534)`,
    color: "#022c22",
    fontWeight: 700,
    fontSize: 13,
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: 10,
    border: `1px solid ${colors.borderStrong}`,
    backgroundColor: colors.bgRoot,
    color: colors.textPrimary,
    fontSize: 14,
    marginBottom: 8,
    outline: "none",
    textTransform: "uppercase",
    fontWeight: 500,
  };
const ticketCellStyle = (isMarked) => ({
  width: isSmallMobile ? 26 : isMobile ? 32 : 50,
  height: isSmallMobile ? 26 : isMobile ? 32 : 50,
  borderRadius: 6,
  fontSize: isSmallMobile ? 11 : isMobile ? 14 : 18,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: isMarked
    ? `2px solid ${colors.goldStrong}`
    : `1px solid rgba(148,163,184,0.35)`,
  background: isMarked
    ? `radial-gradient(circle at 30% 30%, ${colors.goldSoft}, ${colors.gold})`
    : "rgba(15,23,42,0.7)",
  color: isMarked ? "#020617" : colors.textMuted,
});



  const sectionHeaderStyle = {
    margin: "0 0 4px 0",
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.5,
    textAlign: "center",
  };

  useEffect(() => {

    document.title = "Tambola";
     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

    socket.on("player_joined", d => {
      setPlayerName(d.playerName || "");
      setTickets(d.tickets || []);
      setCalled(d.called || []);
      setCurrent(d.current);
      setClaims(d.claims || {});
      setRoomCode(d.roomCode);
       setMessages(d.chat || []); 
    });


    socket.on("tickets_updated", ({ tickets }) => {
    setTickets(tickets);
  });


 socket.on("chat_message", ({ user, message, time }) => {
    setMessages(prev => [
      ...prev,
      { user, message, time }
    ]);
  });

   socket.on("receiveEmoji", data => {
    setEmojiFeed(prev => [...prev, data]);

    // auto-remove after 3 sec
    setTimeout(() => {
      setEmojiFeed(prev => prev.slice(1));
    }, 3000);
  });


  socket.on("players_table_update", (table) => {
    setPlayers(table);
  });


  socket.on("auto_mark_permission", ({ allowed }) => {
    setAllowAutoMark(allowed);
    setManualMarking(true);
  });


  socket.on("game_reset", () => {
    setTickets([]);
    setCalled([]);
    setCurrent(null);
    setClaims({});
    setMarked({});
    // roomCode & playerName stay (player still connected)
  });
 


    socket.on("number_called", d => {
      setCurrent(d.number);
      setCalled(d.called);
    });

    // socket.on("claim_accepted", d =>
    //   setClaims(c => ({ ...c, [d.claimType]: d.winner }))
    // );

    socket.on("claim_accepted", d => {
    setClaims(c => ({ ...c, [d.claimType]: d.winner }));
    
    // Show success toast to everyone
    // toast.success(`${d.winner} won ${claimLabels[d.claimType]}! 🏆`);
    toast.success(`${d.winner} won ${claimLabels[d.claimType]}! 🏆`, {
  duration: 4000, // 4 seconds
  style: { background: "#111", color: "#FACC15" },
});

  });

    // socket.on("claim_rejected", d =>
    //   alert(`${claimLabels[d.claimType] || d.claimType} INVALID`)
    // );


    socket.on("claim_rejected", d => {
    // Show error toast
    // toast.error(`${claimLabels[d.claimType] || d.claimType} INVALID ❌`);

    toast.error(`${claimLabels[d.claimType] || d.claimType} INVALID ❌`, {
  duration: 4000, // 4 seconds
  style: { background: "#111", color: "#fa1d15" },
});

  });

    return () => socket.off();
  }, [claimLabels,messages]);

  // Check if at least 5 numbers on the ticket have been called
function firstFive(ticket, calledSet) {
  let count = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 9; col++) {
      const num = ticket[row][col];
      if (num !== null && calledSet.has(num)) {
        count++;
        if (count >= 5) return true;
      }
    }
  }
  return false;
}

// Check if a specific line (row) is complete
function lineComplete(ticket, startRow, calledSet) {
  if (!ticket[startRow]) return false;
  for (let col = 0; col < 9; col++) {
    const num = ticket[startRow][col];
    if (num !== null && !calledSet.has(num)) {
      return false;
    }
  }
  return true;
}

// Full house: all numbers called
function fullHouse(ticket, calledSet) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 9; col++) {
      const num = ticket[row][col];
      if (num !== null && !calledSet.has(num)) return false;
    }
  }
  return true;
}

const handleClaim = (claimType) => {
  const calledSet = new Set(called);
  let valid = false;

  for (let ticket of tickets) {
    switch (claimType) {
      case "FIRST_FIVE":
        if (firstFive(ticket, calledSet)) valid = true;
        break;
      case "FIRST_LINE":
        if (lineComplete(ticket, 0, calledSet)) valid = true;
        break;
      case "MIDDLE_LINE":
        if (lineComplete(ticket, 1, calledSet)) valid = true;
        break;
      case "LAST_LINE":
        if (lineComplete(ticket, 2, calledSet)) valid = true;
        break;
      case "FULL_HOUSE":
        if (fullHouse(ticket, calledSet)) valid = true;
        break;
      default:
        break;
    }
    if (valid) break; // stop checking once a valid ticket is found
  }

  if (valid) {
    socket.emit("player_claim", { roomCode, playerCode, claimType });
  } else {
    toast.error(`${claimLabels[claimType] || claimType} INVALID ❌`, {
      duration: 4000,
      style: { background: "#111", color: "#fa1d15" },
    });
  }
};

const [emojiFeed, setEmojiFeed] = useState([]);



  return (
    <div style={containerStyle}>



<div className="emoji-float-container">
  {emojiFeed.map((e, i) => (
    <div key={i} className="emoji-float">
      <strong>{e.playerName}</strong> {e.emoji}
    </div>
  ))}
</div>


      {/* TOP ROW: Welcome Board - Join+Winners | Current | Claims */}
      <div style={threeColumnStyle}>
        {/* COLUMN 1: Player Join + Winners COMBINED */}


{playersOpen && (
  <div className="chat-modal">
    <div className="chat-header">
      <span>👥 Players</span>
      <button onClick={() => setPlayersOpen(false)}>✖</button>
    </div>

    <div className="chat-messages">
      {players.map(p => {
        const isMe = p.name === playerName;
        return (
          <div
            key={p.playerCode}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 8px",
              background: isMe ? "rgba(250,204,21,0.08)" : "transparent",
            }}
          >
            <span>{p.name} {isMe && "⭐"}</span>
            <span
              style={{
                fontSize: 11,
                color: p.status === "ONLINE" ? "#22c55e" : "#9ca3af",
              }}
            >
              {p.status}
            </span>
          </div>
        );
      })}
    </div>
  </div>
)}



        <div style={thirdCardStyle}>
          
          
          {playerName ? (
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 700, 
                color: colors.gold,
                padding: "6px 10px",
                backgroundColor: colors.bgSection,
                borderRadius: 8,
                border: `1px solid ${colors.borderSoft}`,
                marginBottom: 8,
                textTransform: "uppercase",
              }}>
                Welcome {playerName} 👋
              </div>
              {/* <span style={{ fontSize: 11, color: colors.textMuted }}>👋</span> */}
            </div>
          ) : (
            <>
            <h3 style={sectionHeaderStyle}>🎫 Join</h3>
              <input
                placeholder="Code"
                value={playerCode}
                onChange={e => setPlayerCode(e.target.value.toUpperCase())}
                style={inputStyle}
              />
              <button
                style={primaryButton}
                onClick={() => socket.emit("player_join_with_code", { playerCode })}
                disabled={!playerCode}
              >
                Join
              </button>
            </>
          )}

          {/* WINNERS INSIDE JOIN COLUMN */}
          {playerName && <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <h4 style={{ 
              margin: "8px 0 8px 0", 
              color: colors.gold,
              fontSize: 12,
              textAlign: "center",
              fontWeight: 700
            }}>
              🏆 Winners
            </h4>
            <ul style={{ 
              listStyle: "none", 
              padding: 0, 
              margin: 0,
              backgroundColor: colors.bgSection,
              borderRadius: 8,
              border: `1px dashed ${colors.borderSoft}`,
              maxHeight: 150,
              overflowY: "auto",
              flex: 1
            }}>
              {["FIRST_FIVE", "FIRST_LINE", "MIDDLE_LINE", "LAST_LINE", "FULL_HOUSE"].map(c => (
                <li key={c} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "4px 8px",
                  borderBottom: `1px dotted ${colors.borderSoft}`,
                  fontSize: 20
                }}>
                  <span style={{ 
                    // color: colors.textMuted, 
                    textTransform: "uppercase",
                    letterSpacing: 0.1,
                    fontSize: 14
                  }}>
                    {claimLabels[c]}
                  </span>
                  <span style={{ 
                    color: claims[c] ? colors.gold : colors.textSoft,
                    fontWeight: claims[c] ? 700 : 400,
                    fontSize: 18
                  }}>
                    {claims[c] ? `🏆${claims[c]}` : "—"}
                  </span>
                </li>
              ))}
            </ul>

          </div>}
        </div>

        {/* COLUMN 2: Current Number + Last 5 */}
        {playerName &&<div style={thirdCardStyle}>
          <h3 style={sectionHeaderStyle}>🔢 Current</h3>
          <div style={currentNumberStyle}>
            {current || "—"}
          </div>
          
          {called.length > 0 && (
            <div>
              <h4 style={{ 
                margin: "0 0 4px", 
                color: colors.textMuted, 
                fontSize: 11,
                textAlign: "center"
              }}>
                Last 5
              </h4>
              <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                {lastFive.map(n => (
                  <div key={n} style={lastFiveStyle}>
                    {n}
                  </div>
                ))}
              </div>
            </div>
          )}
                 
{playerName && (
  <button
  className="people-bar"
    onClick={() => setPlayersOpen(v => !v)}
  >
    👥 Players ({players.length})
  </button>
)}
        </div>}


        {playerName && <div style={thirdCardStyle}>
  <h3 style={{ 
    ...sectionHeaderStyle,
    color: colors.gold
  }}>
    ⚡ Claims
  </h3>

  <div style={{ 
    display: "grid", 
    gridTemplateColumns: "1fr 1fr", 
    gap: 6,
    marginTop: 4
  }}>
    {["FIRST_FIVE", "FIRST_LINE", "MIDDLE_LINE", "LAST_LINE"].map((claimType) => (
      <button
        key={claimType}
        disabled={!roomCode || !!claims[claimType]} // disable if claimed or no room
        style={claimButton(claimType)}
        onClick={() => handleClaim(claimType)} // ✅ no 'i' needed
      >
        {claimLabels[claimType]}
      </button>
    ))}
  </div>

  <button
    disabled={!roomCode || !!claims["FULL_HOUSE"]}
    style={{
      ...claimButton("FULL_HOUSE"),
      width: "100%", // full width for Full House
      marginTop: 6
    }}
    onClick={() => handleClaim("FULL_HOUSE")} // ✅ no 'i' needed
  >
    {claimLabels["FULL_HOUSE"]}
  </button>
   <div className="emoji-bar">
      {emojis.map(e => (
        <button key={e} onClick={() => sendEmoji(e)}>
          {e}
        </button>
      ))}
    </div>
    
</div>}

      </div>

      {/* BOTTOM ROW: Tickets */}
      {tickets.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
  <div style={fullWidthCardStyle}>
    <h3 style={{ 
      margin: "0 0 24px", 
      color: colors.textPrimary,
      fontSize: 22,
      textAlign: "center"
    }}>
      🎟️ Your Tickets ({tickets.length})
    </h3>
    {allowAutoMark && (
  <label>
    <input
      type="checkbox"
      checked={!manualMarking}
      onChange={(e) => setManualMarking(!e.target.checked)}
    />
    🤖Auto Mark
  </label>
)}

<label
  style={{
    display: "flex",
    flexDirection: "column",
    gap: 8,
    fontSize: 12,
    color: colors.textPrimary,
    cursor: "pointer",
    marginBottom: 8,
  }}
>
  <button
    type="button"
    onClick={() => setShowThemes(v => !v)}
    style={{
      background: "none",
      border: "none",
      color: colors.textPrimary,
      fontSize: 14,
      fontWeight: "bold",
      cursor: "pointer",
      textAlign: "left",
    }}
  >
    🎨 Choose Theme Color {showThemes ? "▲" : "▼"}
  </button>

  {showThemes && (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        justifyContent: isMobile ? "center" : "flex-start",
      }}
    >
      {Object.keys(themes).map((key) => (
        <div
          key={key}
          onClick={() => handleSelect(key)}
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            cursor: "pointer",
            border:
              activeTheme === key
                ? "3px solid #000"
                : "1px solid #ccc",
            background: themes[key].colors.primaryGradient,
          }}
        />
      ))}
    </div>
  )}
</label>



<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
    width: "100%",
    overflowX: "auto",
  }}
>


      {tickets.map((ticket, i) => (
        <div
  key={i}
style={{
  ...ticketStyle(themes[activeTheme]),
  width: "100%",
  maxWidth: isSmallMobile ? 280 : 500,
  marginBottom: 16,
}}

>
  
 <h4 style={{ 
  margin: "0 0 16px",
  color: "#FFFFFF",
  fontSize: 18,
  textAlign: "center",
  // textShadow: "0 1px 3px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.6)"
  textShadow: "0 1px 2px rgba(0,0,0,0.6)"
}}>
  Ticket {i + 1}
</h4>

  <div
    style={{
      display: "grid",
     gridTemplateColumns: isSmallMobile
  ? "repeat(9, 26px)"
  : isMobile
  ? "repeat(9, 32px)"
  : "repeat(9, 50px)",

      gap: 6,
      justifyContent: "center",
      margin: "0 auto",
    }}
  >
    {ticket.flatMap((row, rowIndex) =>
      row.map((num, colIndex) => {
        const isMarked = manualMarking
          ? marked[`${i}-${num}-${rowIndex}-${colIndex}`]
          : called.includes(num);

        return (
          <div
            key={`${i}-${rowIndex}-${colIndex}`}
            style={ticketCellStyle(isMarked)}
            onClick={
              manualMarking && num
                ? () => toggleMark(i, num, rowIndex, colIndex)
                : undefined
            }
          >
            {num || ""}
          </div>
        );
      })
    )}
  </div>
</div>
      ))}
    </div>
  </div>
  </div>
)}

<div className="chat-dock">
  {chatOpen && (
    <div className="chat-modal">
      <div className="chat-header">
        <span>Room Chat</span>
        <button onClick={() => setChatOpen(false)}>✖</button>
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className="chat-msg">
            <strong>{m.user}</strong>
            <span>{m.message}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )}
{playerName ? (
  <button
    className="chat-toggle-btn"
    onClick={() => setChatOpen(v => !v)}
  >
    💬 {chatOpen ? "Close Chat" : "Chat"}
  </button>
) : null}

</div>


      {/* Past Numbers (collapsible) */}
      {pastNumbers.length > 0 && (
        <details style={{ 
          backgroundColor: colors.bgSection, 
          padding: 20, 
          borderRadius: 14, 
          border: `1px solid ${colors.borderSoft}`
        }}>
          <summary style={{ 
            color: colors.textPrimary, 
            fontWeight: 600, 
            cursor: "pointer",
            fontSize: 16,
            marginBottom: 12
          }}>
            📜 Past Numbers ({pastNumbers.length})
          </summary>
          <div style={{ 
            fontSize: 15, 
            color: colors.textMuted,
            fontFamily: "monospace",
            lineHeight: 1.7,
            padding: "12px 0"
          }}>
            {pastNumbers.join(", ")}
          </div>
        </details>
      )}
    </div>
  ); 
}