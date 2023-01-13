window.nova_plugins.push({
   id: 'search-query',
   title: 'Search filters',
   'title:zh': '搜索过滤器',
   'title:ja': '検索フィルター',
   'title:ko': '검색 필터',
   'title:id': 'Filter pencarian',
   'title:es': 'Filtros de búsqueda',
   'title:pt': 'Filtros de pesquisa',
   'title:fr': 'Filtres de recherche',
   'title:it': 'Filtri di ricerca',
   // 'title:tr': 'Arama filtreleri',
   'title:de': 'Suchfilter',
   'title:pl': 'Filtry wyszukiwania',
   'title:ua': 'Фільтр пошуку',
   run_on_pages: 'results',
   restart_on_location_change: true,
   section: 'header',
   // desc: '',
   _runtime: user_settings => {

      // Strategy 1. Patch url
      if (!NOVA.queryURL.has('sp')
         && (sp = user_settings.search_query_date || user_settings.search_query_sort)
      ) {
         location.href = NOVA.queryURL.set({ 'sp': sp });
      }

      // Strategy 2. Patch input
      // if (!NOVA.queryURL.has('sp')
      //    && (sp = user_settings.search_query_date || user_settings.search_query_sort)
      // ) {
      //    NOVA.waitElement('input#search')
      //       .then(input => {
      //          const patchLocation = () => location.href = `/results?search_query=${input.value}&sp=` + sp;
      //          // press "Enter"
      //          input.addEventListener('keydown', ({ keyCode }) => (keyCode === 13) && patchLocation());
      //          input.addEventListener('keydown', ({ key }) => (key === 'Enter') && patchLocation());
      //          // click on button
      //          NOVA.waitElement('button#search-icon-legacy')
      //             .then(button => button.addEventListener('click', patchLocation));
      //       });
      // }

   },
   options: {
      search_query_sort: {
         _tagName: 'select',
         label: 'Sort by',
         'label:zh': '排序方式',
         'label:ja': '並び替え',
         'label:ko': '정렬 기준',
         'label:id': 'Sortir dengan',
         'label:es': 'Ordenar por',
         'label:pt': 'Ordenar por',
         'label:fr': 'Trier par',
         'label:it': 'Ordina per',
         // 'label:tr': 'Göre sırala',
         'label:de': 'Sortieren nach',
         'label:pl': 'Sortuj według',
         'label:ua': 'Сортувати за',
         options: [
            {
               label: 'relevance', value: false, selected: true,
               'label:ua': 'актуальність',
            },
            {
               label: 'upload date', value: 'cai%253d',
               'label:ua': 'дата завантаження',
            },
            {
               label: 'view count', value: 'cam%253d',
               'label:ua': 'кількість переглядів',
            },
            {
               label: 'rating', value: 'cae%253d',
               'label:ua': 'вподобайки',
            },
         ],
         'data-dependent': { 'search_query_date': false },
      },
      search_query_date: {
         _tagName: 'select',
         label: 'Upload date',
         'label:zh': '上传日期',
         'label:ja': 'アップロード日',
         'label:ko': '업로드 날짜',
         'label:id': 'Tanggal unggah',
         'label:es': 'Fecha de carga',
         'label:pt': 'data de upload',
         'label:fr': 'Date de dépôt',
         'label:it': 'data di caricamento',
         // 'label:tr': 'yükleme tarihi',
         'label:de': 'Datum des Hochladens',
         'label:pl': 'Data przesłania',
         'label:ua': 'Дата завантаження',
         options: [
            {
               label: 'all time', value: false, selected: true,
               'label:ua': 'за увесь час',
            },
            {
               label: 'last hour', value: 'egiiaq%253d%253d',
               'label:ua': 'за останню годину',
            },
            {
               label: 'today', value: 'egiiag%253d%253d',
               'label:ua': 'сьогодні',
            },
            {
               label: 'this week', value: 'egiiaw%253d%253d',
               'label:ua': 'цього тижня',
            },
            {
               label: 'this month', value: 'egiiba%253d%253d',
               'label:ua': 'цього місяця',
            },
            {
               label: 'this year', value: 'egiibq%253d%253d',
               'label:ua': 'цього року',
            },
         ],
         'data-dependent': { 'search_query_sort': false },
      },
   }
});
