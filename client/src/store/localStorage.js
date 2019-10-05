
export const loadState = () => {
  try {
    console.log(localStorage)
    const serializedState = localStorage.getItem('state')
    if (!serializedState) { return null }
    return JSON.parse(serializedState)
  } catch (error) {
    return null
  }
}


export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    
  }
}