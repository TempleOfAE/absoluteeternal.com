var overlays = [false,false,false,false,false,false,false]
var overlayPreviousFocus = null

function overlayPanel(d) {
  return document.getElementById("o" + d)
}

function overlayContent(d) {
  return document.getElementById("o" + d + "con")
}

function focusOverlayContent(d) {
  let content = overlayContent(d)
  if (!content) {
    return
  }

  content.scrollTop = 0
  try {
    content.focus({ preventScroll: true })
  } catch (error) {
    content.focus()
  }
}

function focusElement(element) {
  try {
    element.focus({ preventScroll: true })
  } catch (error) {
    element.focus()
  }
}

function moveFocusBeforeHide(d, panel) {
  let activeElement = document.activeElement
  if (!activeElement || !panel.contains(activeElement)) {
    return
  }

  let target = document.body
  if (d == 1 && overlayPreviousFocus && overlayPreviousFocus.focus && !panel.contains(overlayPreviousFocus)) {
    target = overlayPreviousFocus
  }

  focusElement(target)

  if (document.activeElement && panel.contains(document.activeElement)) {
    activeElement.blur()
  }
}

function on(d) {
  let panel = overlayPanel(d)
  if (!panel) {
    return
  }

  if (overlays[d]) {
    return
  }

  if (d == 1) {
    overlayPreviousFocus = document.activeElement
  }

  panel.style.display = "block";
  panel.removeAttribute("inert")
  panel.setAttribute("aria-hidden", "false")
  if (d == 1) {
    focusOverlayContent(d)
  }
  overlays[d] = true
}

function off(d){
  let panel = overlayPanel(d)
  if (!panel) {
    return
  }

  if (!overlays[d]) {
    return
  }

  moveFocusBeforeHide(d, panel)
  panel.setAttribute("aria-hidden", "true")
  panel.setAttribute("inert", "")
  panel.style.display = "none";
  overlays[d] = false
}

function overlayBackdropClick(event, d) {
  if (event.target == event.currentTarget) {
    off(d)
  }
}

document.addEventListener("keydown", function(event) {
  if (event.key != "Escape") {
    return
  }

  for (let i = overlays.length - 1; i >= 0; i--) {
    if (overlays[i]) {
      off(i)
      return
    }
  }
})
