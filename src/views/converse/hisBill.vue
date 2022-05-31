<template>
	<div class="warps">
		<my-el-header title="历史记录" />
		<div class="container">
			<div class="form-nav">
				<el-form :inline="true" :model="form" class="demo-form-inline">
					<el-form-item label="计费账户">
						<el-input v-model="form.name" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="被叫号码">
						<el-input
							v-model="form.mobilePhone"
							placeholder="请输入内容"
						></el-input>
					</el-form-item>
					<el-form-item label="开始时间">
						<el-input
							v-model="form.startingTime"
							placeholder="请输入内容"
						></el-input>
					</el-form-item>
					<el-form-item label="结束时间">
						<el-input
							v-model="form.endTime"
							placeholder="请输入内容"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="find">查询</el-button>
						<el-button type="primary" @click="clear">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table
				height="calc(100vh - 100px - 100px - 100px - 100px)"
				:header-cell-style="{ background: '#ccc', color: '#fff' }"
				:data="list"
				style="width: 100%"
			>
				<el-table-column prop="date" label="序号" width="50px">
					<template scope="scope">{{ scope.$index + 1 }}</template>
				</el-table-column>
				<el-table-column prop="blegCallerIdNumber" label="计费账户">
				</el-table-column>
				<el-table-column prop="blegCallerIdNumber" label="主叫号码">
				</el-table-column>
				<el-table-column prop="blegCalleeIdNumber" label="被叫号码">
				</el-table-column>
				<el-table-column prop="blegContext" label="服务接口"> </el-table-column>
				<el-table-column prop="blegCallerAnsweredTime" label="应答时间">
					<template scope="scope">
						<span v-if="scope.row.blegCallerAnsweredTime">
							{{ scope.row.blegCallerAnsweredTime | formaTime }}
						</span>
						<span v-else>
							{{ scope.row.blegCallerHangupTime | formaTime }}
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="blegCallerHangupTime" label="挂断时间">
					<template scope="scope">
						<span v-if="scope.row.blegCallerHangupTime">
							{{ scope.row.blegCallerHangupTime | formaTime }}
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="blegBillsec" label="计费时长(秒)" align="center">
				</el-table-column>
				<el-table-column prop="blegChannelName" label="通道名称">
          <template scope="scope">
            {{scope.row.blegChannelName |formaString}}
          </template>
				</el-table-column>
				<el-table-column prop="blegContext" label="接口名称"> </el-table-column>
				<el-table-column prop="blegHangupCause" label="挂断原因">
				</el-table-column>
				<el-table-column prop="blegReadCodec" label="通话编码">
				</el-table-column>
			</el-table>
		</div>
		<my-footer
			v-on:next="next"
			@prev="prev"
			:form="form"
			@change="change"
			@pageCheng="pageCheng"
		></my-footer>
	</div>
</template>

<script>
import myElHeader from '@/components/myElHeader';
import myFooter from '@/components/myFooter';
import { getPbxList } from '@/newwork/conferencr';
import { formatDate } from '../../uti';

export default {
	name: 'history',
	components: {
		myElHeader,
		myFooter,
	},

	data() {
		return {
			form: {
				mobilePhone: '',
				startingTime: '',
				endTime: '',
			},
			list: [],
		};
	},

	filters: {
		formaTime(value) {
			return formatDate(value / 1000);
		},
    formaString(value){
      return value.slice(20)
    }
	},
	methods: {
		find() {
			this.getPbxList(this.form);
		},
		clear() {
			this.form = this.$options.data().form;
			this.getPbxList(this.form);
		},
		pageCheng(e) {
			this.form = this.$options.data().form;
			this.form.pageSize = e;
			this.getPbxList(this.form);
		},
		getPbxList(form) {
			getPbxList(form).then((res) => {
				console.log(res);
				if (res.data.code === 200) {
					this.$bus.$emit('total', res.data.data.total);
					this.list = res.data.data.records;
				}
			});
		},
		next() {
			this.form.pageNum++;
			this.getPbxList(this.form);
		},
		prev() {
			this.form.pageNum--;
			this.getPbxList(this.form);
		},
		change(e) {
			this.form.pageNum = e;
			this.getPbxList(this.form);
		},
	},
	created() {
		this.getPbxList(this.form);
	},
	mounted() {
		this.$bus.$on('pageCheng', (data) => {
			this.form = this.$options.data().form;
			this.form.pageSize = data;
			this.getPbxList(this.form);
		});
	},
	destroyed() {
		this.$bus.$off('pageChang');
	},
};
</script>

<style scoped>
.nav-form {
	margin: 15px;
	height: 40px;
	display: flex;
	justify-content: space-between;
}

#networkManagement .width {
	display: flex;
	justify-content: space-between;
}

.width > * {
	flex: 1;
}
</style>
