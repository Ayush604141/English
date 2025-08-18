"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { LetterOptions, VocabItem, VocabType } from "../utils/common";

interface VocabListProps {
  data: VocabItem[];
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

const typeColors: Record<VocabType, string> = {
  word: "primary",
  idiom: "success",
  foreign: "warning",
  "one word": "secondary",
};

const typeGradients: Record<VocabType, string> = {
  word: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  idiom: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  foreign: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "one word": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
};

export default function VocabList({ data, mode, setMode }: VocabListProps) {
  const [type, setType] = useState<VocabType>("word");
  const [letter, setLetter] = useState<string>("a-letter");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<VocabItem[]>(data);

  useEffect(() => {
    const getMainText = (item: VocabItem) => {
      if (item.type === "word" || item.type === "one word") return item.word;
      if (item.type === "idiom") return item.idiom;
      if (item.type === "foreign") return item.word;
      return undefined;
    };

    const getSearchableText = (item: VocabItem): string => {
      const texts = [
        item.word,
        item.idiom,
        item.meaning,
        item["meaning (hindi)"],
        item.synonyms,
      ].filter(Boolean);
      return texts.join(" ").toLowerCase();
    };

    const newFilteredData = data.filter((item) => {
      // Type filter
      if (item.type !== type) return false;

      // Letter filter
      const mainText = getMainText(item);
      if (!mainText || mainText[0]?.toLowerCase() !== letter[0].toLowerCase())
        return false;

      // Search filter
      if (searchQuery) {
        const searchableText = getSearchableText(item);
        const searchTerms = searchQuery.toLowerCase().split(" ");
        return searchTerms.every((term) => searchableText.includes(term));
      }

      return true;
    });

    setFilteredData(newFilteredData);
  }, [type, letter, searchQuery, data]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        width: "100%",
        p: 2,
      }}
    >
      <Box sx={{ mb: 4, mt: 2 }}>
        <Stack spacing={2}>
          {/* Header with search and theme toggle */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                flex: 1,
                borderRadius: 2,
                bgcolor:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.04)"
                    : "rgba(0, 0, 0, 0.03)",
                border: `1px solid ${
                  mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                }`,
                boxShadow:
                  mode === "dark" ? "0 4px 12px rgba(0,0,0,0.3)" : "none",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  bgcolor:
                    mode === "dark"
                      ? "rgba(255, 255, 255, 0.06)"
                      : "rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search in words, meanings, or synonyms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <IconButton
                  sx={{ p: "10px" }}
                  aria-label="clear search"
                  onClick={() => setSearchQuery("")}
                >
                  <ClearIcon />
                </IconButton>
              )}
            </Paper>
            <IconButton
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              sx={{
                position: "relative",
                color:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.7)",
                bgcolor:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.04)"
                    : "rgba(0, 0, 0, 0.03)",
                border: `1px solid ${
                  mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                }`,
                transition: "all 0.3s ease",
                transform: "rotate(0deg)",
                "&:hover": {
                  bgcolor:
                    mode === "dark"
                      ? "rgba(255, 255, 255, 0.06)"
                      : "rgba(0, 0, 0, 0.05)",
                  transform: "rotate(90deg)",
                },
                "& .MuiSvgIcon-root": {
                  transition: "transform 0.3s ease, opacity 0.2s ease",
                  position: "absolute",
                  opacity: 1,
                },
                "& .icon-enter": {
                  transform: "rotate(0deg)",
                  opacity: 1,
                },
                "& .icon-exit": {
                  transform: "rotate(-90deg)",
                  opacity: 0,
                },
              }}
            >
              <Box sx={{ position: "relative", width: 24, height: 24 }}>
                <Box sx={{ position: "absolute" }}>
                  <Brightness7Icon
                    className={mode === "dark" ? "icon-enter" : "icon-exit"}
                    sx={{
                      opacity: mode === "dark" ? 1 : 0,
                      transform:
                        mode === "dark" ? "rotate(0deg)" : "rotate(-90deg)",
                      transition: "all 0.3s ease",
                    }}
                  />
                </Box>
                <Box sx={{ position: "absolute" }}>
                  <Brightness4Icon
                    className={mode === "light" ? "icon-enter" : "icon-exit"}
                    sx={{
                      opacity: mode === "light" ? 1 : 0,
                      transform:
                        mode === "light" ? "rotate(0deg)" : "rotate(-90deg)",
                      transition: "all 0.3s ease",
                    }}
                  />
                </Box>
              </Box>
            </IconButton>
          </Box>

          {/* Type filter using touch-friendly chips */}
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              pb: 1,
              mx: -2,
              px: 2,
              "&::-webkit-scrollbar": { display: "none" },
              scrollSnapType: "x mandatory",
            }}
          >
            {(Object.keys(typeColors) as VocabType[]).map((vocabType) => (
              <Box
                key={vocabType}
                sx={{
                  scrollSnapAlign: "start",
                  mr: 1,
                  "&:last-child": { mr: 0 },
                }}
              >
                <Chip
                  label={
                    vocabType.slice(0, 1).toUpperCase() + vocabType.slice(1)
                  }
                  onClick={() => setType(vocabType)}
                  color={type === vocabType ? "primary" : "default"}
                  variant={type === vocabType ? "filled" : "outlined"}
                  sx={{
                    borderRadius: "16px",
                    height: "40px",
                    "&:hover": {
                      background: type === vocabType ? "" : "rgba(0,0,0,0.04)",
                    },
                    "& .MuiChip-label": {
                      px: 2,
                      fontSize: "1rem",
                    },
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Letter filter using scrollable touch bar */}
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              pb: 1,
              mx: -2,
              px: 2,
              "&::-webkit-scrollbar": { display: "none" },
              scrollSnapType: "x mandatory",
            }}
          >
            {Object.values(LetterOptions).map((letterOption) => {
              const letterValue = letterOption
                .replace("-letter", "")
                .toUpperCase();
              const isSelected = letter === letterOption;
              return (
                <Box
                  key={letterOption}
                  sx={{
                    scrollSnapAlign: "start",
                    mr: 0.5,
                    "&:last-child": { mr: 0 },
                  }}
                >
                  <Chip
                    label={letterValue}
                    onClick={() => setLetter(letterOption)}
                    color={isSelected ? "primary" : "default"}
                    variant={isSelected ? "filled" : "outlined"}
                    sx={{
                      minWidth: "40px",
                      height: "40px",
                      borderRadius: "20px",
                      "& .MuiChip-label": {
                        px: 1,
                        fontSize: "0.875rem",
                        fontWeight: isSelected ? "bold" : "normal",
                      },
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
          width: "100%",
          mt: 2,
        }}
      >
        {filteredData.map((item, idx) => (
          <Card
            key={idx}
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 6,
              background: mode === "dark" ? "rgba(32, 32, 32, 0.95)" : "white",
              backdropFilter: "blur(20px)",
              border: `1px solid ${
                mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"
              }`,
              boxShadow:
                mode === "dark"
                  ? "0 8px 32px rgba(0,0,0,0.5)"
                  : "0 8px 32px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow:
                  mode === "dark"
                    ? "0 12px 40px rgba(0,0,0,0.6)"
                    : "0 12px 40px rgba(0,0,0,0.15)",
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1, width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Chip
                  label={item.type}
                  size="small"
                  sx={{
                    background: typeGradients[item.type],
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                    "& .MuiChip-label": { px: 2 },
                  }}
                />
              </Box>

              {/* Word / Idiom */}
              <Typography
                variant="h5"
                fontWeight="700"
                gutterBottom
                sx={{
                  width: "100%",
                  mb: 2,
                  background: typeGradients[item.type],
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  lineHeight: 1.2,
                }}
              >
                {item.word?.toUpperCase() || item.idiom}{" "}
                {item["meaning (hindi)"] && `(${item["meaning (hindi)"]})`}
              </Typography>

              {/* English meaning */}
              {item.meaning && (
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    lineHeight: 1.7,
                    color: "text.primary",
                    fontSize: "0.95rem",
                  }}
                >
                  {item.meaning}
                </Typography>
              )}

              {/* Synonyms */}
              {item.synonyms && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                      mb: 1,
                      display: "block",
                    }}
                  >
                    SYNONYMS
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {item.synonyms.split(",").map((syn, i) => (
                      <Chip
                        key={i}
                        label={syn.trim()}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: "primary.main",
                          color: "primary.main",
                          fontSize: "0.75rem",
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Example sentence */}
              {item.sentences && (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontWeight: 600 }}
                    >
                      EXAMPLE
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: "italic",
                      color: "text.secondary",
                      width: "100%",
                      backgroundColor:
                        mode === "dark"
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.04)",
                      p: 2,
                      borderRadius: 2,
                      borderLeft: `4px solid ${
                        typeColors[item.type]
                          ? `var(--mui-palette-${typeColors[item.type]}-main)`
                          : "var(--mui-palette-primary-main)"
                      }`,
                      lineHeight: 1.6,
                    }}
                  >
                    &quot;{item.sentences}&quot;
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      {filteredData.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography
            variant="h6"
            sx={{
              color:
                mode === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
              mb: 2,
            }}
          >
            No vocabulary found
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color:
                mode === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)",
            }}
          >
            Try adjusting your search terms or filters
          </Typography>
        </Box>
      )}
    </Box>
  );
}
