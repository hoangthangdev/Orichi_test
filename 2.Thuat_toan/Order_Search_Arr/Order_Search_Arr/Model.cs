using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Order_Search_Arr
{
    public class Score
    {
        public int Math { get; set; }
        public int Physic { get; set; }
        public int Chemistry { get; set; }

        public double AverageScore()
        {
            return (Math + Physic + Chemistry) / 3.0;
        }
    }

    public class Student
    {
        public string Name { get; set; }
        public Score Score { get; set; }

        public Student(string name, int math, int physic, int chemistry)
        {
            Name = name;
            Score = new Score { Math = math, Physic = physic, Chemistry = chemistry };
        }
    }

}
