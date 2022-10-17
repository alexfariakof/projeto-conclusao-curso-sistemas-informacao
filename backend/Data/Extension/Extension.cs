using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend
{
    public static class Extension
    {
        public static int ToInteger(this String strToConvert)
        {
            int strConvert;
            int.TryParse(strToConvert, out strConvert);
            return strConvert;
        }

        public static int ToInteger(this object objToConvert)
        {
            int objConvert;
            int.TryParse(objToConvert.ToString(), out objConvert);
            return objConvert;

        }
        public static String ToDateBr(this DateTime objToConvert)
        {
            var obj = DateTime.Parse(objToConvert.ToString()).ToString("dd/MM/yyyy");

            return obj;

        }
        public static DateTime ToDateTime(this String objToConvert)
        {
            DateTime obj;

            DateTime.TryParse(objToConvert, out obj);

            return obj;

        }
        public static Decimal ToDecimal(this String objToConvert)
        {
            Decimal obj;

            Decimal.TryParse(objToConvert, out obj);

            return obj;

        }




    }
}
