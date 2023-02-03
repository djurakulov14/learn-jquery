const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' },
    ru: { nativeName: 'Russian' }
  };
  
  const rerender = () => {
    // start localizing, details:
    // https://github.com/i18next/jquery-i18next#usage-of-selector-function
    $('body').localize();
  }


$(function () {
    // use plugins and options as needed, for options, detail see
    // https://www.i18next.com
    i18next
      // detect user language
      // learn more: https://github.com/i18next/i18next-browser-languageDetector
      .use(i18nextBrowserLanguageDetector)
      // init i18next
      // for all options read: https://www.i18next.com/overview/configuration-options
      .init({
        debug: false,
        fallbackLng: 'en',
        resources: {
          en: {
            translation: {
              hello: "Explore the main masterpieces of architecture, hear stories from the past and experience the twilight magic of the East"
            }
          },
          de: {
            translation: {
              hello: "Entdecken Sie die wichtigsten Meisterwerke der Architektur, hören Sie Geschichten aus der Vergangenheit und erleben Sie den Dämmerungszauber des Ostens"
            }
          },
          ru: {
            translation: {
              hello: "Изучить главные шедевры архитектуры, услышать истории из прошлого и ощутить сумеречную магию Востока"
            }
          }
        }
      }, (err, t) => {
        if (err) return console.error(err);
  
        // for options see
        // https://github.com/i18next/jquery-i18next#initialize-the-plugin
        jqueryI18next.init(i18next, $, { useOptionsAttr: true });
  
        // start localizing, details:
        // https://github.com/i18next/jquery-i18next#usage-of-selector-function
        $('body').localize();

        Object.keys(lngs).map((lng) => {
            const opt = new Option(lngs[lng].nativeName, lng);
            if (lng === i18next.resolvedLanguage) {
              opt.setAttribute("selected", "selected");
            }
            $('#languageSwitcher').append(opt);
          });
          $('#languageSwitcher').change((a, b, c) => {
            const chosenLng = $(this).find("option:selected").attr('value');
            i18next.changeLanguage(chosenLng, () => {
              rerender();
            });
          });
    
          rerender();
      });
  });