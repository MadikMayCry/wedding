"use client";

import { addItem } from "@/components/lib/create-post";
import NewForm from "@/components/TestForm";

export default function Home() {
  const handler = async () => {
    const response = await addItem();

    console.log(response);
  };

  return (
    <div>
      {/*<button onClick={handler}>click me</button>*/}
      <NewForm />
    </div>
  );
}
