import firebase from 'firebase/app'

function Projects() {
  return (
    <>
      <header>Projects</header>
      <nav>
        <ul>
          <li>
            <a href="#">Projects</a>
          </li>
          <li>
            <button
              onClick={() => {
                firebase.auth().signOut()
              }}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
      <section>
        <article className="grid gap-10">project</article>
      </section>
    </>
  )
}

export default Projects
