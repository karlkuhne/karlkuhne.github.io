import { defineStore } from 'pinia';

export const useLightboxStore = defineStore('lightbox', {
  state: () => ({
    isVisible: false,
    projectName: null as string | null,
    projectDescription: null as string | null,
    projectImages: undefined as string[] | undefined,
    projectHasPage: undefined as boolean | undefined,
    projectLink: undefined as string | undefined,
  }),

  actions: {
    open(
      projectName: string,
      projectDescription: string,
      projectImages: string[] | undefined,
      projectHasPage: boolean | undefined,
      projectLink: string | undefined
    ) {

      this.isVisible = true;
      this.projectName = projectName;
      this.projectDescription = projectDescription;
      this.projectImages = projectImages;
      this.projectHasPage = projectHasPage;
      this.projectLink = projectLink;
    },

    close() {
      this.isVisible = false;
      this.projectName = null;
      this.projectDescription = null;
      this.projectImages = undefined;
      this.projectHasPage = undefined;
      this.projectLink = undefined;
    }
  }
});
