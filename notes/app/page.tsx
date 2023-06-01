import getAllNotes from "./actions/getAllNotes";
import CardListView from "./components/CardListView";

export default async function Home() {
  const notes = await getAllNotes();

  return (
    <div className="card-view">
      <CardListView notes={notes} showEdit={false} />
    </div>
  );
}
