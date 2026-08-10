export default function JobStatistics(){

return(

<div className="grid gap-5 md:grid-cols-4">


<div className="rounded-xl bg-white p-6 shadow">
<h3 className="text-gray-500">
Total Jobs
</h3>

<p className="text-3xl font-bold">
500
</p>

</div>



<div className="rounded-xl bg-white p-6 shadow">
<h3 className="text-gray-500">
Pending Review
</h3>

<p className="text-3xl font-bold text-yellow-600">
25
</p>

</div>




<div className="rounded-xl bg-white p-6 shadow">
<h3 className="text-gray-500">
Approved
</h3>

<p className="text-3xl font-bold text-green-600">
450
</p>

</div>




<div className="rounded-xl bg-white p-6 shadow">
<h3 className="text-gray-500">
Rejected
</h3>

<p className="text-3xl font-bold text-red-600">
25
</p>

</div>


</div>

)

}