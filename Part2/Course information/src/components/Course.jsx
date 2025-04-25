const Course = ({courses}) => courses.map((course) => {
  const Header = (props) => <h1>{props.course}</h1>

  const Content = ({parts}) => parts.map((part) => <p key={part.id}>{part.name} {part.exercises}</p>)

  const Total = ({parts}) => {
    return (
      <b>total of {
        parts.reduce((acc,curr) => acc + curr.exercises,0)
      } exercises</b>
    )
  }

  return (
    <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
})

export default Course