import React from "react";
import VocabList from "../components/VocabList";
import Vocab from "@/words.json";
import { Stack } from "@mui/material";

export default function Index() {
  return (
    <Stack>
      <VocabList data={Vocab} />
    </Stack>
  );
}
