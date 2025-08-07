"use client";
import { AnimatePresence, motion } from "motion/react";

import { Box, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";

export const ExitAnimation = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ]);

  const handleRemove = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Box p={4}>
      <VStack gap={4} align="stretch">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <Box
                p={4}
                bg="gray.100"
                borderRadius="md"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {item.text}
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleRemove(item.id)}
                >
                  Delete
                </Button>
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>
      </VStack>
    </Box>
  );
};
