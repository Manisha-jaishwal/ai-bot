import { Box, Stack, Typography } from '@mui/material';
import InitialChat from '../../Component/InitialChat/InitialChat';
import ChatInput from '../../Component/ChatInput/ChatInput';
import ChattingCard from '../../Component/ChattingCard/ChattingCard';
import FeedbackModal from '../../Component/FeedbackModal/FeedbackModal';
import { useEffect, useRef, useState, useContext } from 'react';
import data from '../../aiData/sampleData.json';
import { useOutletContext } from "react-router-dom";
import Navbar from '../../Component/Navbar/Navbar';
import { ThemeContext } from '../../theme/ThemeContext';

export default function Home() {

  const [showModal, setShowModal] = useState(false);
  const listRef = useRef(null);
  const [chatId, setChatId] = useState(1);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const { chat, setChat } = useOutletContext();
  const { mode } = useContext(ThemeContext);

  // GENERATING AI RESPONSE
  const generateResponse = (input) => {
    const response = data.find(item => input.toLowerCase() === item.question.toLowerCase());

    let answer = "Sorry, Did not understand your query!";

    if (response !== undefined) {
      answer = response.response;
    }

    setChat(prev => ([
      ...prev,
      {
        type: 'Human',
        text: input,
        time: new Date(),
        id: chatId
      },
      {
        type: 'AI',
        text: answer,
        time: new Date(),
        id: chatId + 1
      }
    ]));

    setChatId(prev => prev + 2);
  };

  // AUTOSCROLL TO LAST ELEMENT
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [scrollToBottom]);

  return (
    <Stack
  height="100vh"
  sx={{
    background: mode === "light"
      ? "linear-gradient(180deg, #F6F2FF 0%, #F6F2FF 100%)"  // ✅ same color everywhere
      : "#121212",
  }}
>


      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <Stack flex={1} width="100%" overflow="hidden">

        {/* Initial Chat - Centered */}
        {chat.length === 0 && (
          <Stack
            flex={1}
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <InitialChat generateResponse={generateResponse} />
          </Stack>
        )}

        {/* Chat Messages */}
        {chat.length > 0 && (
          <Stack
            flex={1}
            p={{ xs: 2, md: 3 }}
            spacing={{ xs: 2, md: 3 }}
            sx={{
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '10px',
              },
              '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
                borderRadius: '8px'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(151, 133, 186,0.4)',
                borderRadius: '8px'
              }
            }}
            ref={listRef}
          >
            {chat.map((item, index) => (
              <ChattingCard
                details={item}
                key={index}
                updateChat={setChat}
                setSelectedChatId={setSelectedChatId}
                showFeedbackModal={() => setShowModal(true)}
              />
            ))}
          </Stack>
        )}

      </Stack>

      {/* Chat Input */}
      <ChatInput
        generateResponse={generateResponse}
        setScroll={setScrollToBottom}
        chat={chat}
        clearChat={() => setChat([])}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        open={showModal}
        updateChat={setChat}
        chatId={selectedChatId}
        handleClose={() => setShowModal(false)}
      />

    </Stack>
  );
}
