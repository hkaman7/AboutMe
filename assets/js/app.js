const collections = {
  "climate-weather": {
    title: "Climate & Weather Forecasting",
    headline: "Hybrid physics + ML pipelines for localized climate resilience decisions.",
    description:
      "This collection experiments with data assimilation, physics-informed models, and uncertainty quantification to support planners and emergency responders.",
    featuredProject: "weather-cmip-downscaling",
    metrics: [
      ["Focus", "Fusing satellite, radar, and reanalysis data for adaptive forecasts"],
      ["Stack", "xarray · PyTorch · MetPy · NetCDF · Prefect"],
      ["Reusable modules", "Bias correction kernels · Ensemble orchestration · Impact dashboards"],
    ],
    workflow: [
      ["Collect", "Ingest multi-resolution climate data feeds"],
      ["Correct", "Calibrate bias and align grids with physical priors"],
      ["Model", "Run ensemble nowcasting + PINT fine-tuning"],
      ["Share", "Publish risk briefings and alert hooks"],
    ],
    projects: [
      {
        id: "weather-cmip-downscaling",
        title: "Weather CMIP Data Downscaling using ERA5",
        summary:
          "Developing a multimodel ViT architecture for downscaling the CMIP data using ERA5 with focus on short- and long-term drought forecasting.",
        tags: ["Microsoft Internship"],
        visuals: [
          {
            type: "image",
            src: "assets/images/CA_t2m.gif",
            alt: "Animated visualization of CMIP data downscaling using ERA5 guidance",
            caption: "ERA5-guided downscaling animation",
          },
        ],
      },
      {
        id: "fognet-v2",
        title: "FogNet-v2.0 Vision Transformer",
        summary:
          "FogNet-v2.0 is an improved weather prediction model that uses a physics-informed vision transformer to forecast coastal fog. It combines atmospheric physics principles with a transformer architecture to deliver robust, explainable visibility categories up to 24 hours ahead.",
        tags: ["AI2ES"],
        visuals: [
          {
            type: "image",
            src: "assets/images/token.png",
            alt: "Explainable Physics-Informed Vision Transformer for Coastal Fog Forecasting diagram",
            caption: "FogNet-v2.0 explainable transformer diagram",
          },
        ],
        links: [
          {
            label: "Preprint",
            url: "https://essopenarchive.org/users/733679/articles/1021813-fognet-v2-0-explainable-physics-informed-vision-transformer-for-coastal-fog-forecasting",
          },
        ],
      },
    ],
  },
  "precision-agriculture": {
    title: "Precision Agriculture",
    headline: "Data products that translate field sensing into grower-ready decisions.",
    description:
      "Experiments span phenotyping, irrigation scheduling, and soil health analytics, blending remote sensing with robotics and agronomy expertise.",
    featuredProject: "field-scouting",
    metrics: [
      ["Focus", "Variable-rate management, crop health scoring, input optimization"],
      ["Stack", "Sentinel-2 · OpenDroneMap · FastAPI · Grafana"],
      ["Reusable modules", "Edge-to-cloud sync · Crop stress index · Recommendation engine"],
    ],
    workflow: [
      ["Sense", "Capture drone, satellite, and in-field probe data"],
      ["Diagnose", "Compute crop stress and growth stage models"],
      ["Recommend", "Generate input prescriptions + alerts"],
      ["Verify", "Log outcomes & close the agronomic feedback loop"],
    ],
    projects: [
      {
        id: "cmavit-downscaling",
        title: "CMAViT Crop Yield Forecasting",
        summary:
          "Climate Management Aware ViT (CMAViT) fuses satellite, climate, management, and soil signals to model county-level crop yields across time.",
        tags: ["AIFS"],
        visuals: [
          {
            type: "image",
            src: "assets/images/CMAViT.png",
            alt: "CMAViT architecture connecting climate, management, and remote sensing inputs",
            caption: "CMAViT multimodal architecture for vineyard yield forecasting",
          },
        ],
      },
      {
        id: "california-crop-benchmark",
        title: "California Crop Yield Benchmark",
        summary:
          "The California Crop Yield Benchmark integrates satellite imagery, climate, evapotranspiration, and soil layers to forecast yields for 70+ crops statewide (2008–2022).",
        tags: ["Benchmark"],
        visuals: [
          {
            type: "image",
            src: "assets/images/init.png",
            alt: "California crop yield benchmark overview",
            caption: "Benchmark coverage across California agricultural regions",
          },
        ],
        links: [
          { label: "Dataset", url: "https://huggingface.co/datasets/hkaman/california-crop-yield-benchmark" },
        ],
      },
    ],
  },
  "ml-tools": {
    title: "ML Tools",
    headline: "Reusable tooling so every project can ship, explain, and monitor reliably.",
    description:
      "Tooling covers experiment orchestration, transparency layers, and deployment scaffolding tuned for scientific applications.",
    featuredProject: null,
    metrics: [
      ["Focus", "Reproducibility, observability, explainability"],
      ["Stack", "Dagster · Terraform · Svelte · LangChain"],
      ["Reusable modules", "Feature registry · Guarded endpoints · Narrative explainer kit"],
    ],
    workflow: [
      ["Plan", "Template new experiments with governance baked in"],
      ["Build", "Package models with standardized metadata"],
      ["Deploy", "Automate CI/CD, staging, and approvals"],
      ["Explain", "Ship guided explainers + monitoring panels"],
    ],
    projects: [],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".pillar-card"));
  const themeButtons = Array.from(document.querySelectorAll(".intro__project-tag"));
  const titleEl = document.querySelector(".details__title");
  const subtitleEl = document.querySelector(".details__subtitle");
  const descriptionEl = document.querySelector(".details__description");
  const metricsEl = document.querySelector(".details__metrics");
  const visualGrid = document.querySelector(".visual-grid");
  const subprojectList = document.querySelector(".subproject-list");
  const subprojectTitleEl = document.querySelector(".details__subproject-title");
  const subprojectSummaryEl = document.querySelector(".details__subproject-summary");
  const subprojectTagsEl = document.querySelector(".details__subproject-tags");

  let activeCollectionId = null;
  let activeSubprojectId = null;

  const setActiveCard = (card) => {
    cards.forEach((item) => {
      const isActive = item === card;
      item.setAttribute("aria-selected", String(isActive));
      item.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  };

  const setActiveThemeButton = (collectionId) => {
    themeButtons.forEach((button) => {
      const isActive = button.dataset.projectId === collectionId;
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const renderMetrics = (metrics) => {
    metricsEl.innerHTML = "";
    metrics.forEach(([label, value]) => {
      const dt = document.createElement("dt");
      dt.textContent = label;
      const dd = document.createElement("dd");
      dd.textContent = value;
      metricsEl.append(dt, dd);
    });
  };

  const renderDefaultVisual = (collection) => {
    if (!visualGrid) {
      return;
    }
    visualGrid.innerHTML = "";
    if (collection?.workflow?.length) {
      collection.workflow.forEach(([label, detail], index) => {
        const figure = document.createElement("figure");
        figure.className = "visual-item visual-item--text";
        const step = document.createElement("div");
        step.className = "visual-step";
        step.innerHTML = `<strong>${String(index + 1).padStart(2, "0")} · ${label}</strong>`;
        const caption = document.createElement("figcaption");
        caption.textContent = detail;
        figure.append(step, caption);
        visualGrid.append(figure);
      });
      return;
    }
    const placeholder = document.createElement("p");
    placeholder.className = "visual-placeholder";
    placeholder.textContent = "Visuals coming soon.";
    visualGrid.append(placeholder);
  };

  const renderProjectVisual = (project, collection) => {
    if (!visualGrid) {
      return;
    }
    visualGrid.innerHTML = "";
    const visuals = project?.visuals || (project?.visual ? [project.visual] : []);
    const usableVisuals = visuals.filter((item) => item && item.type === "image" && item.src);
    if (usableVisuals.length) {
      usableVisuals.forEach((visual) => {
        const figure = document.createElement("figure");
        figure.className = "visual-item";
        const img = document.createElement("img");
        img.className = "visual-media";
        img.src = visual.src;
        img.alt = visual.alt || "Project visualization";
        figure.append(img);
        if (visual.caption) {
          const caption = document.createElement("figcaption");
          caption.textContent = visual.caption;
          figure.append(caption);
        }
        visualGrid.append(figure);
      });
      return;
    }
    renderDefaultVisual(collection);
  };

  const updateSubprojectCardSelection = (subprojectId) => {
    subprojectList?.querySelectorAll(".subproject-card").forEach((entry) => {
      const isSelected = entry.dataset.subprojectId === subprojectId;
      entry.setAttribute("aria-selected", String(isSelected));
    });
  };

  const applySubprojectSelection = (collection, subproject) => {
    if (!subproject) {
      subprojectTitleEl.textContent = "Select a project to see its highlights.";
      subprojectSummaryEl.textContent = "";
      if (subprojectTagsEl) {
        subprojectTagsEl.innerHTML = "";
      }
      renderProjectVisual(null, collection);
      return;
    }

    activeSubprojectId = subproject.id;
    updateSubprojectCardSelection(activeSubprojectId);

    subprojectTitleEl.textContent = subproject.title;
    subprojectSummaryEl.textContent = subproject.summary;
    if (subprojectTagsEl) {
      subprojectTagsEl.innerHTML = "";
      if (subproject.tags?.length) {
        subproject.tags.forEach((tag) => {
          const badge = document.createElement("span");
          badge.className = "details__subproject-tag";
          badge.textContent = tag;
          subprojectTagsEl.append(badge);
        });
      }
    }

    renderProjectVisual(subproject, collection);
  };

  const renderSubprojects = (collection) => {
    if (!subprojectList) {
      return;
    }

    subprojectList.innerHTML = "";
    const projects = Array.from(collection.projects || []);
    if (!projects.length) {
      const emptyState = document.createElement("p");
      emptyState.className = "subproject-empty";
      emptyState.textContent = "Add project cards here once you are ready to showcase them.";
      subprojectList.append(emptyState);
      applySubprojectSelection(collection, null);
      return;
    }

    const featuredId = collection.featuredProject && projects.some((project) => project.id === collection.featuredProject)
      ? collection.featuredProject
      : projects[0].id;

    const orderedProjects = [
      projects.find((project) => project.id === featuredId),
      ...projects.filter((project) => project.id !== featuredId),
    ].filter(Boolean);

    let initialProject = null;

    orderedProjects.forEach((project) => {
      const card = document.createElement("article");
      card.className = "subproject-card";
      card.setAttribute("role", "listitem");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-selected", "false");
      card.dataset.subprojectId = project.id;

      const title = document.createElement("h4");
      title.className = "subproject-card__title";
      title.textContent = project.title;

      const summary = document.createElement("p");
      summary.className = "subproject-card__meta";
      summary.textContent = project.summary;

      card.append(title, summary);

      if (project.tags?.length) {
        const tagsWrap = document.createElement("div");
        tagsWrap.className = "subproject-card__tags";
        project.tags.forEach((tag) => {
          const badge = document.createElement("span");
          badge.className = "subproject-card__tag";
          badge.textContent = tag;
          tagsWrap.append(badge);
        });
        card.append(tagsWrap);
      }

      if (project.links?.length) {
        const linksWrap = document.createElement("div");
        linksWrap.className = "subproject-card__links";
        project.links.forEach((link) => {
          if (!link.url) {
            return;
          }
          const anchor = document.createElement("a");
          anchor.className = "subproject-card__link";
          anchor.href = link.url;
          anchor.target = "_blank";
          anchor.rel = "noopener noreferrer";
          anchor.textContent = link.label;
          linksWrap.append(anchor);
        });
        card.append(linksWrap);
      }

      card.addEventListener("click", () => {
        applySubprojectSelection(collection, project);
      });

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          applySubprojectSelection(collection, project);
        }
      });

      if (!initialProject) {
        initialProject = project;
      }

      subprojectList.append(card);
    });

    applySubprojectSelection(collection, initialProject);
  };

  const updateDetails = (collectionId) => {
    const collection = collections[collectionId];
    if (!collection) {
      return;
    }

    activeCollectionId = collectionId;

    titleEl.textContent = collection.title;
    subtitleEl.textContent = collection.headline;
    descriptionEl.textContent = collection.description;
    renderMetrics(collection.metrics);
    renderDefaultVisual(collection);
    renderSubprojects(collection);
  };

  const handleCardSelection = (card) => {
    if (!card) {
      return;
    }
    const { projectId } = card.dataset;
    setActiveCard(card);
    setActiveThemeButton(projectId);
    activeSubprojectId = null;
    updateDetails(projectId);
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => handleCardSelection(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleCardSelection(card);
      }
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        const nextIndex = (cards.indexOf(card) + 1) % cards.length;
        cards[nextIndex].focus();
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        const prevIndex = (cards.indexOf(card) - 1 + cards.length) % cards.length;
        cards[prevIndex].focus();
      }
    });
  });

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const matchingCard = cards.find((card) => card.dataset.projectId === button.dataset.projectId);
      if (matchingCard) {
        handleCardSelection(matchingCard);
        matchingCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const matchingCard = cards.find((card) => card.dataset.projectId === button.dataset.projectId);
        if (matchingCard) {
          handleCardSelection(matchingCard);
        }
      }
    });
  });

  if (cards.length) {
    handleCardSelection(cards[0]);
  }
});
