    
    export const FormatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = { 
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(dateString).toLocaleDateString([], options);
    };

    export const GetDayOfDate = (dateString: any) => { 
      var date = new Date(dateString);
      return date.toLocaleDateString("en-us", { weekday: 'long' });
    };

    
