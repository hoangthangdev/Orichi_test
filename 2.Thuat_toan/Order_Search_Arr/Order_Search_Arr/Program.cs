using Order_Search_Arr;

class programs
{
    static void Main()
    {
        // a. Khởi tạo class cho object và khởi tạo array với dữ liệu ngẫu nhiên.

        List<Student> students = new List<Student>
        {
            new Student("Nguyen Van C", 10, 9, 8),
            new Student("Le Thi B", 7, 6, 5),
            new Student("Nguyen Van A", 8, 9, 10),
            new Student("Nguyen Van D", 7, 8, 9),
            new Student("Bui Thi E", 8, 8, 8),
            new Student("Bui Thi F", 8, 8, 8)
        };
        //B. Sắp xếp mảng đó theo thứ tự điểm trung bình các môn giảm dần, với các object có điểm trung bình bằng nhau,
        // sắp xếp theo “name” với alphabel tăng dần. (Không sử dụng hàm sort/order hay thư viện ngoài)
        SortStudents(students);
        Console.WriteLine("Order:");
        for (int i = 0; i < students.Count; i++)
        {
            Console.WriteLine($"student : {i} : {students[i].Name} ,AverageScore:  {students[i].Score.AverageScore()}");
        }

        //C. Với mảng đã sắp xếp, hãy tìm ra nhanh nhất có thể object có điểm trung bình bằng 8.
        var student = BinarySearchStudent(students, 8);
        if (student != null)
        {
            Console.WriteLine($"Found student: {student.Name}");
        }
        else
        {
            Console.WriteLine("Not found.");
        }
        Console.ReadKey();
    }
    static void SortStudents(List<Student> students)
    {
        int n = students.Count;

        for (int i = 0; i < n - 1; i++)
        {
            for (int j = 0; j < n - i - 1; j++)
            {
                double avg1 = students[j].Score.AverageScore();
                double avg2 = students[j + 1].Score.AverageScore();

                // Sắp xếp điểm trung bình giảm dần
                if (avg1 < avg2)
                {
                    Swap(students, j, j + 1);
                }
                // Nếu điểm trung bình bằng nhau thì sắp xếp theo tên tăng dần
                else if (avg1 == avg2 && string.Compare(students[j].Name, students[j + 1].Name) > 0)
                {
                    Swap(students, j, j + 1);
                }
            }
        }
    }
    // đổi thứ tự cho các phần tử
    static void Swap(List<Student> students, int i, int j)
    {
        Student temp = students[i];
        students[i] = students[j];
        students[j] = temp;
    }


    //tìm kiếm theo phương pháp nhị phân
    static Student? BinarySearchStudent(List<Student> students, double targetAverage)
    {
        int left = 0;
        int right = students.Count - 1;

        while (left <= right)
        {
            int mid = left + (right - left) / 2;
            double midAvg = students[mid].Score.AverageScore();

            if (midAvg == targetAverage)
            {
                return students[mid];
            }
            else if (midAvg > targetAverage)
            {
                left = mid + 1;
            }
            else
            {
                right = mid - 1;
            }
        }

        return null;
    }
}
