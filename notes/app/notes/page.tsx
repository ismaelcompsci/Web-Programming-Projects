import getCurrentUser from "../actions/getCurrentUser";
import getUserNotes from "../actions/getUserNotes";
import CardListView from "../components/CardListView";

const Notes = async () => {
  const notes = await getUserNotes();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className="no_user">
        <a href="/">
          <h1>Please Log in</h1>
        </a>
      </div>
    );
  }

  return (
    <div className="card-view">
      <CardListView notes={notes} currentUser={currentUser} showEdit={true} />
    </div>
  );
};

export default Notes;
