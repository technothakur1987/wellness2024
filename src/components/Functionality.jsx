import React, { useContext, useState, useEffect , memo} from "react";
import whitearrow from "../assets/whitearrow.png";
import { AppContext } from "../store/store";

const Functionality = () => {
  const { dispatch, allData } = useContext(AppContext);
  
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

 
  {/*getting all the unique tags in an array here called types as per project */ }
  const types1 = [
    ...new Set(allData.map((item)=>{
      return item.tag

    }).flat())
  ];
 
  

  {/*getting all the unique dates in a sorted form*/}
   const Dates1 = [...new Set(allData.map((item)=>{
    return item.date;
  }).sort((a,b)=>{
   return a-b
  }))]

 {/*function to get year from date */}
 const formatDate1 = (timestamp) => {
  let newDate1 = new Date(timestamp * 1000);
  let options = { year: "numeric" };
  return newDate1.toLocaleDateString("en-US", options);
};
{/*year1 is an array of unique years*/}
const year1 = [...new Set(Dates1.map((fulldate)=>{
    return formatDate1(fulldate)
}))]


{/*get data by Date*/}
  const getDataByDate = (e)=>{
    const filteredData = allData.filter((item) => {
       return (formatDate1(item.date)) === (selectedDate)
    })
    dispatch({ type: "SET_FILTERDATA", payload: filteredData });
    
  }

  {/*get data by TYpe*/}
  const getDataByType = (e) => {
    const filteredData = allData.filter((item) => {
      return item.tag.includes(selectedType) ;
    });
   
    dispatch({ type: "SET_FILTERDATA", payload: filteredData });
  };

   {/*get data by Title*/}
   const getDataByTitle = (e) => {

    setTimeout(()=>{
        const filteredData = allData.filter((item) => {
            return  item.title.toLowerCase().includes(selectedTitle.toLowerCase())
          });
         dispatch({ type: "SET_FILTERDATA", payload: filteredData });

    },500)
   
  };

  

  { /*get data by TYpe && Date*/}
  const getDataByDateAndType = (e) => {
    const filteredData = allData.filter((item) => {
      return item.tag.includes(selectedType) && (formatDate1(item.date)) === (selectedDate);
    });
    dispatch({ type: "SET_FILTERDATA", payload: filteredData });
  };

  {/*get data by date && title*/}
  const getDataByDateAndTitle = ()=>{
    setTimeout(()=>{
        const filteredData = allData.filter((item) => {
            return  item.title.toLowerCase().includes(selectedTitle.toLowerCase()) && (formatDate1(item.date)) === (selectedDate)
          });
         dispatch({ type: "SET_FILTERDATA", payload: filteredData });

    },500)
  }

  {/*get data by Type && Title*/}
  const getDataByTypeAndTitle = (e) => {
    setTimeout(()=>{
        const filteredData = allData.filter((item) => {
            return  item.title.toLowerCase().includes(selectedTitle.toLowerCase()) && item.tag.includes(selectedType)
          });
        dispatch({ type: "SET_FILTERDATA", payload: filteredData });

    },500)

  }

  {/*get data by Date && Type && Title*/}
  const getDataByDateAndTypeAndTitle = (e)=>{
    setTimeout(()=>{
        const filteredData = allData.filter((item) => {
            return  item.title.toLowerCase().includes(selectedTitle.toLowerCase()) && (formatDate1(item.date)) === (selectedDate) && item.tag.includes(selectedType)
          });
          console.log(filteredData);
          dispatch({ type: "SET_FILTERDATA", payload: filteredData });

    },500)
  }

  {/*consolidated Logic to getData as per selected type and date */}

  const getData = ()=>{
    if(selectedDate==='' && selectedType === '' && selectedTitle === ''){
            console.log('all are empty')
            dispatch({ type: "SET_FILTERDATA", payload: allData });
    }else if(selectedDate!=='' && selectedType === '' && selectedTitle === ''){
        console.log('date is filled only ')
        getDataByDate();
            
    }else if(selectedDate==='' && selectedType !== '' && selectedTitle === ''){
        console.log('type is filled only ')
        getDataByType();

    }else if(selectedDate==='' && selectedType === '' && selectedTitle !== ''){
        console.log('title is filled only ')
        getDataByTitle()

    }else if(selectedDate!=='' && selectedType !== '' && selectedTitle === ''){
        console.log('date and type are filled only ')
        getDataByDateAndType()
    }else if(selectedDate!=='' && selectedType === '' && selectedTitle !== ''){
        console.log('date and title are filled only ')
        getDataByDateAndTitle()

    }else if(selectedDate==='' && selectedType !== '' && selectedTitle !== ''){
        console.log('type and title are filled only ')
        getDataByTypeAndTitle()

    }else if(selectedDate!=='' && selectedType !== '' && selectedTitle !== ''){
            console.log('all are filled')
            getDataByDateAndTypeAndTitle()
    }

  }



  useEffect(() => {
    getData();
    
  }, [selectedDate, selectedType, selectedTitle, dispatch]);
  return (
    <div className="flex mx-5  flex-col md:flex-row items-stretch md:items-center justify-between py-4 font-open-sans md:font-source-sans">
      <div className="flex flex-col md:flex-row basis-full md:basis-[30%] items-stretch md:items-center justify-start   ">
        <div className=" basis-full md:basis-[30%]  ">
          <label htmlFor="searchDate" className="sr-only">
            Filter by Date
          </label>
          <select
            name="searchDate"
            id="searchDate"
             className=" bg-[#efefef] md:bg-[#1b3252]  text-gray-500 md:text-white border-transparent bg-no-repeat bg-right outline-none focus:border-transparent focus:ring-0 focus:shadow-[0_0_0_2px_rgba(255,255,255,0.5)] rounded py-2 md:py-0  font-medium w-full md:w-fit "
             
            
            
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
          >
            <option value="" className="bg-[#efefef] text-black">Filter by Date</option>
            
            {
              year1.map((year)=>{
                return (
                  <option value={`${year}`} key={year} className="bg-[#efefef] text-black">{Number(year)}-{Number(year)+1}</option>
                )

              })
            }
          </select>
        </div>
        <div className=" basis-full md:basis-[30%]  ml-0 md:ml-5 my-3 md:my-0">
          <label htmlFor="searchType" className="sr-only">
            Filter by Type
          </label>
          <select
            name="searchType"
            id="searchType"
            className="bg-[#efefef] md:bg-[#1b3252] text-gray-500 md:text-white border-transparent bg-no-repeat bg-right pr-6 outline-none focus:border-transparent focus:ring-0 focus:shadow-[0_0_0_2px_rgba(255,255,255,0.5)] rounded py-2 md:py-0  font-medium w-full md:w-fit bg-[{`url(${whitearrow})`}]"
            
            onChange={(e) => {
              setSelectedType(e.target.value);
            }}
          >
            <option value="" className="bg-[#efefef] text-black">Filter by Type</option>
            {types1.map((type) => {
              return (
                <option value={`${type}`} key={type} className="bg-[#efefef] text-black capitalize">
                  {type}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="basis-full md:basis-[30%] ">
        <label htmlFor="searchTitle" className="sr-only">
          Search retreats by title
        </label>
        <input
          type="text"
          name="searchTitle"
          id="searchTitle"
          placeholder="Search retreats by title"
          className="bg-[#efefef] md:bg-[#1b3252] text-gray-500 md:text-white border-transparent bg-no-repeat bg-right pr-6 outline-none focus:border-transparent focus:ring-0 focus:shadow-[0_0_0_2px_rgba(255,255,255,0.5)] rounded py-2 md:py-0 text-base font-medium w-full placeholder:text-gray-500 md:placeholder:text-white "
          onChange={(e) => {
            setSelectedTitle(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default memo(Functionality);
