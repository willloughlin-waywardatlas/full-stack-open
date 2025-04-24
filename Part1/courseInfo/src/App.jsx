const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
     <Part partObj={props.parts[0]} />
     <Part partObj={props.parts[1]} />
     <Part partObj={props.parts[2]} />
    </>
  )
}

const Part = (props) => {
  return(
    <>
      <p>{props.partObj.name} {props.partObj.exercises}</p>
    </>
  )
}

const Total = (props) => {
  let total = 0;
  props.parts.forEach((part) => total += part.exercises);
  return (
    <>
     <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} /> 
      <Total parts={course.parts} />
    </div>
  )
}

export default App