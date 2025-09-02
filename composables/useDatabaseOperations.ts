const projects = ref([]);

export const useDatabaseOperations = () => {

  // ==============================================================
  //   ██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗
  //   ██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝
  //   ██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║   
  //   ██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║   
  //   ██║     ██║  ██║╚██████╔╝╚█████╔╝███████║╚██████╗   ██║   
  //   ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   
  // ==============================================================

  const getAllProjectsByLang = (lang: string) => {
    const config = useRuntimeConfig();

    const fetchProjects = async () => {
      const response = await fetch(`${config.public.apiEndpoint}/projects/lang/${lang}`, { method: 'GET' })
      const data = await response.json();
      projects.value = data.projects;
    };

    return {
      projects: projects,
      refreshProjects: fetchProjects
    };
  };

  // =====================================
  //   ██████╗  █████╗  ██████╗ ███████╗
  //   ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
  //   ██████╔╝███████║██║  ███╗█████╗  
  //   ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
  //   ██║     ██║  ██║╚██████╔╝███████╗
  //   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
  // =====================================

  const getPageById = async (id: number) => {
    const config = useRuntimeConfig();
    const response = await fetch(`${config.public.apiEndpoint}/pages/${id}`, { method: 'GET' });
    const data = await response.json();
    return data;
  };

  const getPageIdByLangAndName = async (lang: string, name: string) => {
    const config = useRuntimeConfig();
    const response = await fetch(`${config.public.apiEndpoint}/pages/${name}/${lang}/id`, { method: 'GET' });
    const data = await response.json();
    return data.id;
  }

  const getPageContentByIdAndLang = async (id: number, lang: string) => {
    const config = useRuntimeConfig();
    const response = await fetch(`${config.public.apiEndpoint}/pages/${id}/${lang}`, { method: 'GET' });
    const data = await response.json();
    return data.content;
  }

  // ================================================================================================
  //    █████╗ ██████╗  ██████╗ ██╗   ██╗████████╗      ██████╗  ██████╗ ██╗  ██╗███████╗███████╗
  //   ██╔══██╗██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝      ██╔══██╗██╔═══██╗╚██╗██╔╝██╔════╝██╔════╝
  //   ███████║██████╔╝██║   ██║██║   ██║   ██║         ██████╔╝██║   ██║ ╚███╔╝ █████╗  ███████╗
  //   ██╔══██║██╔══██╗██║   ██║██║   ██║   ██║         ██╔══██╗██║   ██║ ██╔██╗ ██╔══╝  ╚════██║
  //   ██║  ██║██████╔╝╚██████╔╝╚██████╔╝   ██║         ██████╔╝╚██████╔╝██╔╝ ██╗███████╗███████║
  //   ╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚═════╝    ╚═╝         ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
  // ================================================================================================

  const getAboutBoxesByLang = async (lang: string) => {
    const config = useRuntimeConfig();
    const response = await fetch(`${config.public.apiEndpoint}/aboutboxes/lang/${lang}`, { method: 'GET' })
    const data = await response.json();
    return data.aboutBoxes;
  }

  return {
    getAllProjectsByLang,
    getPageById,
    getPageIdByLangAndName,
    getAboutBoxesByLang,
    getPageContentByIdAndLang
  }
} 
