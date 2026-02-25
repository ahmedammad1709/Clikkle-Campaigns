import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Alert,
  Rating,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import React, { useState } from "react";
import axios from "axios";

const Feedback = ({ open, onClose }) => {
  const [category, setCategory] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [checked, setChecked] = useState(false);
  const [rating, setRating] = useState(0);

  const [satisfactionEmoji, setSatisfactionEmoji] = useState(null);
  const satisfactionEmojis = [
    { icon: "😡", label: "Very Dissatisfied" },
    { icon: "😕", label: "Dissatisfied" },
    { icon: "😐", label: "Neutral" },
    { icon: "🙂", label: "Satisfied" },
    { icon: "🤩", label: "Very Satisfied" },
  ];
  const user = JSON.parse(localStorage.getItem("user"));

  const queries = [
    {
      name: "Ask a question",
      value: "Question",
      question: "What would you like to know?",
    },
    {
      name: "Leave a comment",
      value: "Comment",
      question: "Let us know what's on your mind",
    },
    {
      name: "Report a bug",
      value: "Bug",
      question: "Describe the bug or issue",
    },
    {
      name: "Suggest an improvement",
      value: "Suggestion",
      question: "What would you like to improve?",
    },
    {
      name: "Give a rating",
      value: "Rating",
      question: "Rate us (1-5) and tell us why",
    },
  ];

  // const appName = "Clikkle_Projects";
  // const appName = "Clikkle_Hr";
  // const appName = "Clikkle_eSign";
  // const appName = "Clikkle_Chat";
  const appName = "Clikkle_Campaigns";
  // const appName = "Clikkle_Files";
  // const appName = "Clikkle_Worksuite";

  const sendFeedback = async (e) => {
    e.preventDefault();

    if (!category || !checked) {
      setError(
        "Please select a category and agree to be contacted (if you'd like a reply)."
      );
      return;
    }

    if (category.value === "Rating") {
      if (!rating || rating < 1) {
        setError("Please give a rating between 1 and 5 stars.");
        return;
      }
      if (!content.trim()) {
        setError("Please add a short note about your rating.");
        return;
      }
    } else {
      if (!content.trim()) {
        setError(
          "Please select a category, enter your feedback, and agree to be contacted"
        );
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      const userEmail = user?.recoveryEmail;
      const userId = user?._id;

      let finalContent = content;
      if (category.value === "Rating") {
        const filled = "★".repeat(rating);
        const empty = "☆".repeat(5 - rating);
        finalContent = `${filled}${empty} (${rating}/5) — ${content}`;
      }

      if (satisfactionEmoji) {
        finalContent = `${satisfactionEmoji.icon} ${finalContent} — [${satisfactionEmoji.label}]`;
      }

      const response = await axios.post(
        `${"https://admin.clikkle.com:5100"}/api/feedback`,
        {
          appName,
          category: category.value,
          content: finalContent,
          userEmail,
          userId,
          meta: {
            url: window.location.href,
            browser: navigator.userAgent,
            rating: category.value === "Rating" ? rating : undefined,
            emoji: satisfactionEmoji || undefined,
          },
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setCategory(null);
        setContent("");
        setChecked(false);
        setRating(0);
        setSatisfactionEmoji(null); 
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
      }}
    >
      <Card
        className="relative"
        sx={{
          borderRadius: 3,
          maxWidth: 600,
          width: "100%",
          p: 3,
          bgcolor: "background.paper",
          boxShadow: 4,
          mx: "20px",
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          textAlign="right"
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" fontWeight={600} textAlign={"center"}>
            Help us improve Clikkle
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          mb={2}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {satisfactionEmojis.map((emo, idx) => {
              const selected = satisfactionEmoji?.icon === emo.icon;
              return (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => setSatisfactionEmoji(emo)}
                    aria-label={`satisfaction-${idx + 1}`}
                    sx={{
                      p: 0.5,
                      fontSize: 28,
                      borderRadius: 1,
                      opacity: selected ? 1 : 0.7,
                      bgcolor: selected ? "action.selected" : "transparent",
                      "&:hover": {
                        bgcolor: selected ? "action.selected" : "action.hover",
                      },
                    }}
                  >
                    <span style={{ fontSize: 28 }}>{emo.icon}</span>
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "0.75rem", mt: 0.5 }}
                  >
                    {emo.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight={500} textAlign={"center"} fontFamily={"cursive"}>
            Share your thoughts
          </Typography>
        </Stack>
        <Select
          fullWidth
          size="small"
          displayEmpty
          sx={{ mb: 3 }}
          value={category || ""}
          renderValue={(v) => (v ? v.name : "I want to...")}
          onChange={(e) => setCategory(e.target.value)}
        >
          {queries.map((query, i) => (
            <MenuItem value={query} key={i}>
              {query.name}
            </MenuItem>
          ))}
        </Select>

        {category && (
          <Box mb={2}>
            <Typography variant="body2" fontWeight={500} gutterBottom>
              {category.question} <span style={{ color: "red" }}>*</span>
            </Typography>

            {category.value === "Rating" && (
              <Box mb={2}>
                <Typography variant="body2" gutterBottom>
                  How would you rate your experience?
                </Typography>
                <Rating
                  name="feedback-rating"
                  value={rating}
                  onChange={(e, newValue) => setRating(newValue)}
                  precision={1}
                  size="medium"
                />
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  (1 = worst, 5 = best) — please add a short note below.
                </Typography>
              </Box>
            )}

            <TextField
              size="small"
              fullWidth
              placeholder="Type your feedback here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              minRows={5}
              sx={{ mb: 2 }}
            />

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                }
                label={
                  <Typography variant="body2">
                    Clikkle may contact me about this feedback.
                  </Typography>
                }
              />
            </FormGroup>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Feedback submitted successfully!
          </Alert>
        )}

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={sendFeedback}
            disabled={
              !category ||
              !checked ||
              !satisfactionEmoji ||
              loading ||
              (category?.value !== "Rating" && !content.trim()) ||
              (category?.value === "Rating" &&
                (!rating || rating < 1 || !content.trim()))
            }
            endIcon={
              loading && <CircularProgress size="18px" color="inherit" />
            }
          >
            Send feedback
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default Feedback;
