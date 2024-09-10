function ScreenTitle({title}) {
  return(
    <div className="screen-title">
      <div className="d-arrow">&raquo;</div>
      {title}
      <div className="d-arrow">&raquo;</div>
    </div>
  )
}

export default ScreenTitle;