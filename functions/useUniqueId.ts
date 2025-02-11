'use client'

import { useState } from "react";

let idCounter = 0;

export function useUniqueId() {
  const [id] = useState(() => `id-${idCounter++}`);
  return id;
}
