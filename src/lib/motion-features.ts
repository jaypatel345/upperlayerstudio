import { domAnimation } from "motion/react";

// Split out so MotionProvider can load it lazily. domAnimation covers
// everything the site uses: animate/exit, whileInView and height: auto.
export default domAnimation;
