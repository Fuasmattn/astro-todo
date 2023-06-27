import type { APIRoute } from "astro";
import { v4 as uuidv4 } from "uuid";

export interface Item {
  name: string;
  done: boolean;
  id: string;
}

export interface List {
  name: string;
  id: string;
  description?: string;
  items: Item[];
}

const lists: List[] = [
  {
    name: "Private",
    description: "Some private todos",
    id: uuidv4(),
    items: [],
  },
  {
    name: "Work",
    description: "Important notes on my daily work",
    id: uuidv4(),
    items: [
      { name: "finish astro example", done: false, id: uuidv4() },
      { name: "do other stuff", done: true, id: uuidv4() }
  ],
  },
];

export const get: APIRoute = ({ params }) => {
  const { listId } = params;
  // TODO: how to handle the "getAllLists" case correctly with dynamic routes?
  if (listId === "lists") {
    return new Response(JSON.stringify(lists), { status: 200 });
  }
  const list = lists.find((l) => l.id === listId);
  return new Response(JSON.stringify(list), { status: 200 });
};

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  console.log(body)
  lists.push({ name: body.name, description: body.description, items: [], id: uuidv4() });

  return new Response(null, { status: 200 });
};
