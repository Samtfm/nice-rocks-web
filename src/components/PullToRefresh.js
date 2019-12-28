import React, { useState, useRef, useEffect } from 'react';
import styles from './PullToRefresh.scss';

const THRESHOLD = 60;
const REFRESHING_OFFSET = 30;
const genStyles = (offset, touchAction) => {
  return {
    Transform: 'translate3d( 0, ' + offset + 'px, 0 )',
    WebkitTransform: 'translate3d( 0, ' + offset + 'px, 0 )',
    touchAction: touchAction,
  }
}

const PullToRefresh = ({onRefresh, children}) => {
  const scrollContainer = useRef(null);
  const revealedBackground = useRef(null);
  const [offset, setOffset] = useState(0);
  const [touchAction, setTouchAction] = useState('none !important');

  useEffect(() => {
    console.log("use effect")
    const scrollState = {
      touchStartY: null,
      overscroll: 0,
      refreshing: false,
    }
    const handleTouchStart = e => {
      if (typeof e['targetTouches'] !== "undefined"){
        var touch = e.targetTouches[0];
        scrollState.touchStartY = touch.clientY + window.scrollY;
      } else {
        console.log('start alt',e.clientY);
      }
    }
    const handleTouchMove = e => {
      if (typeof e['targetTouches'] !== "undefined"){
        var touch = e.targetTouches[0];
        if (e.cancelable && !scrollState.refreshing && scrollState.touchStartY && window.scrollY === 0 && touch.clientY - scrollState.touchStartY > 0) {
          var amount = touch.clientY - scrollState.touchStartY;
          scrollState.overscroll = amount
          setOffset(scrollState.overscroll);

          revealedBackground.current.style.opacity = String(Math.min(1, Math.pow(scrollState.overscroll/THRESHOLD, 2)))
          e.preventDefault();
        } else if (!scrollState.refreshing && scrollState.overscroll !== 0) {
          scrollState.overscroll = 0
          setOffset(0)
          revealedBackground.current.style.opacity = 0;
        }
      }
    }
    const handleTouchEnd = () => {
      if (scrollState.overscroll > THRESHOLD) {
        scrollState.overscroll = REFRESHING_OFFSET
        onRefresh().then(success => {
          scrollState.overscroll = 0
          setOffset(scrollState.overscroll);
          scrollState.refreshing = false;
          revealedBackground.current.style.opacity = 0;
        }).catch(err => {
          console.log(err);
          scrollState.overscroll = 0
          setOffset(scrollState.overscroll);
          scrollState.refreshing = false;
          revealedBackground.current.style.opacity = 0;
        })
      } else {
        scrollState.overscroll = 0;
      }
      setOffset(scrollState.overscroll);
      scrollState.touchStartY = null;
    }
    const handleTouchCancel = () => {
      scrollState.overscroll = 0
      setOffset(scrollState.overscroll);
      scrollState.touchStartY = null;
      revealedBackground.current.style.opacity = 0;
    }
    scrollContainer.current.addEventListener('touchstart', handleTouchStart);
    scrollContainer.current.addEventListener('touchmove', handleTouchMove, {passive: false});
    scrollContainer.current.addEventListener('touchend',  handleTouchEnd)
    scrollContainer.current.addEventListener('touchcancel', handleTouchCancel);
    return () => {
      scrollContainer.current.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.current.removeEventListener('touchmove', handleTouchMove, {passive: false});
      scrollContainer.current.removeEventListener('touchend',  handleTouchEnd)
      scrollContainer.current.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, []);
  return (
    <>
      <div ref={revealedBackground} className={styles['revealed-background']}></div>
      <div ref={scrollContainer} style={genStyles(offset, touchAction)} className={styles['pull-to-refresh']}>{children}</div>
    </>
  )
}

export default PullToRefresh;
