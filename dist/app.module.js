"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const openai_service_1 = require("./openai/openai.service");
const candidate_scanning_service_1 = require("./candidate-analysis/candidate-scanning.service");
const candidate_scanning_controller_1 = require("./candidate-analysis/candidate-scanning.controller");
const openai_module_1 = require("./openai/openai.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [openai_module_1.OpenaiModule],
        controllers: [candidate_scanning_controller_1.CandidateScanningController],
        providers: [app_service_1.AppService, openai_service_1.OpenaiService, candidate_scanning_service_1.CandidateScanningService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map