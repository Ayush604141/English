"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { LetterOptions, VocabItem, VocabType } from "../utils/common";

interface VocabListProps {
  data: VocabItem[];
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

export default function VocabList({ data }: VocabListProps) {
  const [type, setType] = useState<VocabType>("word");
  const [letter, setLetter] = useState<string>("a-letter");
  const [filteredData, setFilteredData] = useState<VocabItem[]>(data);

  useEffect(() => {
    const getMainText = (item: VocabItem) => {
      if (item.type === "word" || item.type === "one word") return item.word;
      if (item.type === "idiom") return item.idiom;
      if (item.type === "foreign") return item.word;
      return undefined;
    };

    const newFilteredData = data.filter((item) => {
      if (item.type !== type) return false;
      const mainText = getMainText(item);
      return mainText && mainText[0]?.toLowerCase() === letter[0].toLowerCase();
    });
    setFilteredData(newFilteredData);
  }, [type, letter, data]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        width: "100%",
        p: 2,
      }}
    >
      <AppBar color="default" position="fixed" sx={{ p: 2 }}>
        <Stack direction="row" gap={2}>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as VocabType)}
            fullWidth
          >
            {(Object.keys(typeColors) as VocabType[]).map((vocabType) => (
              <MenuItem key={vocabType} value={vocabType}>
                {vocabType.slice(0, 1).toUpperCase() + vocabType.slice(1)}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={letter}
            onChange={(e) => setLetter(e.target.value as string)}
            fullWidth
          >
            {Object.values(LetterOptions).map((letter) => (
              <MenuItem key={letter} value={letter}>
                {letter
                  .replace("-letter", "")
                  .toUpperCase()
                  .concat(" character")}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </AppBar>
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
          mt: 12,
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
              background: "white",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
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
                {item.word || item.idiom}{" "}
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
                      backgroundColor: "rgba(0,0,0,0.04)",
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
          <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.7)", mb: 2 }}>
            No vocabulary found
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.6)" }}>
            Try adjusting your search terms or filters
          </Typography>
        </Box>
      )}
    </Box>
  );
}
