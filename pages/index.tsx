import React from "react";
import VocabList from "../components/VocabList";
import Vocab from "../words.json";
import { Stack } from "@mui/material";
import { VocabItem } from "../utils/common";

interface IndexProps {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

export default function Index({ mode, setMode }: IndexProps) {
  return (
    <Stack>
      <VocabList data={Vocab as VocabItem[]} mode={mode} setMode={setMode} />
    </Stack>
  );
}
