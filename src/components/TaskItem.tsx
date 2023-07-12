import { h } from "preact";
import { useState } from "preact/hooks";

interface Props {
  item: import("../pages/[listId].json").Item;
}

export default function TaskItem({ item }: Props) {
  const [isDone, setIsDone] = useState(item.done);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = async () => {
    const tmp = isDone;
    // opimistic update
    setIsDone(!isDone);
    try {
      setIsLoading(true);
      await fetch("http://asdf.gh"); // let it throw on purpose for presentation purposes
      setError(null);
    } catch (e) {
      // rollback
      setIsDone(tmp);
      setError("Could not save changes. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        onClick={onChange}
        class={`${isLoading && "animate-pulse"} flex cursor-pointer gap-2`}
      >
        <input
          disabled={isLoading}
          type="checkbox"
          checked={isDone}
          onChange={onChange}
        />

        <p>{item.name}</p>
      </div>
      {error && <p class="text-sm text-red-500">{error}</p>}
    </div>
  );
}
