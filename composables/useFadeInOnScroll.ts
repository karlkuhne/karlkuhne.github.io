import { onMounted, onBeforeUnmount } from 'vue';

export const useFadeInOnScroll = (boolRef: Ref<boolean>, elementRef: Ref<HTMLElement | null>) => {
  let observer: IntersectionObserver | null = null;

  const options = {
    root: null,
    rootMargin: "0px 0px -125px 0px",
    threshold: 0,

  };

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        boolRef.value = true;
        if (observer) {
          observer.unobserve(entry.target);
        }
      }
    });
  };

  onMounted(() => {
    if (elementRef.value) {
      observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(elementRef.value);
    }
  });

  onBeforeUnmount(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value);
    }
  });
};
