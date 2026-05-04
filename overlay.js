var overlays = [false,false,false,false,false,false,false]
var overlayPreviousFocus = []

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
  if (!element || !element.focus) {
    return
  }

  try {
    element.focus({ preventScroll: true })
  } catch (error) {
    element.focus()
  }
}

function overlayFocusableElements(panel) {
  return Array.from(panel.querySelectorAll([
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ].join(","))).filter(function(element) {
    return element.offsetParent != null
  })
}

function topOverlayIndex() {
  for (let i = overlays.length - 1; i >= 0; i--) {
    if (overlays[i]) {
      return i
    }
  }

  return -1
}

function updateOverlayAnimationPause() {
  if (typeof window.setTempleAnimationPaused != "function") {
    return
  }

  window.setTempleAnimationPaused(topOverlayIndex() >= 0)
}

function moveFocusBeforeHide(d, panel) {
  let activeElement = document.activeElement
  if (!activeElement || !panel.contains(activeElement)) {
    return
  }

  let target = document.body
  if (overlayPreviousFocus[d] && overlayPreviousFocus[d].focus && !panel.contains(overlayPreviousFocus[d])) {
    target = overlayPreviousFocus[d]
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

  overlayPreviousFocus[d] = document.activeElement

  panel.style.display = "block";
  panel.removeAttribute("inert")
  panel.setAttribute("aria-hidden", "false")
  focusOverlayContent(d)
  overlays[d] = true
  updateOverlayAnimationPause()
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
  updateOverlayAnimationPause()
}

function overlayBackdropClick(event, d) {
  if (event.target == event.currentTarget) {
    off(d)
  }
}

document.addEventListener("keydown", function(event) {
  let activeOverlayIndex = topOverlayIndex()

  if (event.key == "Escape") {
    if (activeOverlayIndex >= 0) {
      off(activeOverlayIndex)
      event.preventDefault()
    }
    return
  }

  if (event.key != "Tab" || activeOverlayIndex < 0) {
    return
  }

  let panel = overlayPanel(activeOverlayIndex)
  let focusableElements = overlayFocusableElements(panel)
  if (focusableElements.length == 0) {
    event.preventDefault()
    focusOverlayContent(activeOverlayIndex)
    return
  }

  let first = focusableElements[0]
  let last = focusableElements[focusableElements.length - 1]

  if (event.shiftKey && document.activeElement == first) {
    event.preventDefault()
    focusElement(last)
  } else if (!event.shiftKey && document.activeElement == last) {
    event.preventDefault()
    focusElement(first)
  }
})
