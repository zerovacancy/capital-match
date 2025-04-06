import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Slider 
} from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InfoIcon, ChevronRightIcon, RefreshCwIcon, SaveIcon, PlusIcon } from 'lucide-react';
import { 
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { cn, formatCurrency } from '@/lib/utils';
import { ScenarioModelingProps } from './ScenarioModeling.types';
import { useScenarioModeling } from './useScenarioModeling';

export function ScenarioModeling({ deal, className }: ScenarioModelingProps) {
  const [activeTab, setActiveTab] = useState("parameters");
  const [showNewScenarioDialog, setShowNewScenarioDialog] = useState(false);
  const [newScenarioName, setNewScenarioName] = useState("");
  
  const {
    scenarioParams,
    savedScenarios,
    activeScenarioId,
    baselineParams,
    currentProjectedMetrics,
    currentCashFlows,
    updateParameter,
    createScenario,
    resetToBaseline,
    compareWithBaseline,
    setActiveScenarioId
  } = useScenarioModeling(deal);
  
  const comparison = compareWithBaseline();
  
  const handleCreateScenario = () => {
    if (newScenarioName.trim()) {
      createScenario(newScenarioName);
      setNewScenarioName("");
      setShowNewScenarioDialog(false);
    }
  };
  
  // Format delta metrics with + or - sign
  const formatDelta = (value: number, unit: string = '') => {
    const prefix = value > 0 ? '+' : '';
    return `${prefix}${value}${unit}`;
  };
  
  // Determine color based on value (positive is green, negative is red)
  const deltaColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  // Format metrics for IRR, EM, etc.
  const formatMetric = (value: number, type: string) => {
    switch (type) {
      case 'percent':
        return `${value}%`;
      case 'multiple':
        return `${value}x`;
      case 'currency':
        return formatCurrency(value);
      case 'time':
        // Convert months to years and months
        const years = Math.floor(value / 12);
        const months = value % 12;
        return years > 0 
          ? `${years}y ${months}m` 
          : `${months}m`;
      default:
        return value.toString();
    }
  };
  
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Scenario Modeling</CardTitle>
            <CardDescription>
              Analyze investment returns under different scenarios
            </CardDescription>
          </div>
          <Select 
            value={activeScenarioId} 
            onValueChange={setActiveScenarioId}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select scenario" />
            </SelectTrigger>
            <SelectContent>
              {savedScenarios.map(scenario => (
                <SelectItem key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-2"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="projections">Projections</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <Tabs value={activeTab} className="h-full">
          <TabsContent value="parameters" className="m-0">
            <div className="space-y-6 px-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Adjust Parameters</h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={resetToBaseline}
                  >
                    <RefreshCwIcon className="mr-1 h-3 w-3" />
                    Reset
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowNewScenarioDialog(true)}
                  >
                    <SaveIcon className="mr-1 h-3 w-3" />
                    Save Scenario
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {scenarioParams.map((param) => (
                  <div key={param.id} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{param.name}</span>
                        <TooltipProvider>
                          <UITooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon size={14} className="text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              <p className="max-w-[200px]">{param.description}</p>
                            </TooltipContent>
                          </UITooltip>
                        </TooltipProvider>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "ml-2 text-xs",
                            param.impact === "high" ? "border-red-500 text-red-500" : 
                            param.impact === "medium" ? "border-amber-500 text-amber-500" : 
                            "border-blue-500 text-blue-500"
                          )}
                        >
                          {param.impact} impact
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-sm">
                          {param.unit === '$' 
                            ? formatCurrency(param.value) 
                            : `${param.value}${param.unit}`}
                        </span>
                      </div>
                    </div>
                    <Slider
                      defaultValue={[param.value]}
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      onValueChange={(value) => updateParameter(param.id, value[0])}
                      className="pt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground pt-1">
                      <span>
                        {param.unit === '$' 
                          ? formatCurrency(param.min) 
                          : `${param.min}${param.unit}`}
                      </span>
                      <span>
                        {param.unit === '$' 
                          ? formatCurrency(param.max) 
                          : `${param.max}${param.unit}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Card className="bg-lg-background border border-lg-highlight/30 shadow-md">
                <CardHeader className="py-3 px-4 bg-lg-highlight/10">
                  <CardTitle className="text-sm text-lg-blue font-semibold">
                    Projected Returns with Current Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-3 px-4 pb-4">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <p className="text-xs text-lg-text font-semibold">IRR</p>
                      </div>
                      <p className="text-xl font-bold text-lg-blue">{formatMetric(currentProjectedMetrics.irr, 'percent')}</p>
                    </div>
                    <div className="space-y-1 border-l border-lg-highlight/20 pl-4">
                      <div className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                        <p className="text-xs text-lg-text font-semibold">Equity Multiple</p>
                      </div>
                      <p className="text-xl font-bold text-lg-blue">{formatMetric(currentProjectedMetrics.equityMultiple, 'multiple')}</p>
                    </div>
                    <div className="space-y-1 border-l border-lg-highlight/20 pl-4">
                      <div className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 8v8"/>
                          <path d="M8 12h8"/>
                        </svg>
                        <p className="text-xs text-lg-text font-semibold">Cash on Cash</p>
                      </div>
                      <p className="text-xl font-bold text-lg-blue">{formatMetric(currentProjectedMetrics.cashOnCash, 'percent')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="projections" className="m-0">
            <div className="space-y-6 px-2">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm">Projected Returns</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">IRR</span>
                          <span className="text-sm font-bold">{formatMetric(currentProjectedMetrics.irr, 'percent')}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${(currentProjectedMetrics.irr / 25) * 100}%` }}>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Equity Multiple</span>
                          <span className="text-sm font-bold">{formatMetric(currentProjectedMetrics.equityMultiple, 'multiple')}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${(currentProjectedMetrics.equityMultiple / 3) * 100}%` }}>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Cash on Cash</span>
                          <span className="text-sm font-bold">{formatMetric(currentProjectedMetrics.cashOnCash, 'percent')}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${(currentProjectedMetrics.cashOnCash / 12) * 100}%` }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm">Additional Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Return on Investment:</span>
                        <span className="text-sm font-semibold">{formatMetric(currentProjectedMetrics.roi, 'percent')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Net Present Value:</span>
                        <span className="text-sm font-semibold">{formatMetric(currentProjectedMetrics.npv, 'currency')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Payback Period:</span>
                        <span className="text-sm font-semibold">{formatMetric(currentProjectedMetrics.paybackPeriod, 'time')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Equity Required:</span>
                        <span className="text-sm font-semibold">{formatCurrency(deal.capitalRequirements.equityRequired)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm">Projected Cash Flows</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-4 h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={currentCashFlows}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        tickFormatter={(value) => value.toString()}
                      />
                      <YAxis 
                        tickFormatter={(value) => 
                          value >= 1000000 
                            ? `$${(value / 1000000).toFixed(1)}M` 
                            : value >= 1000 
                            ? `$${(value / 1000).toFixed(0)}K` 
                            : `$${value}`
                        }
                      />
                      <Tooltip 
                        formatter={(value: number) => [
                          formatCurrency(value), 
                          "Cash Flow"
                        ]} 
                      />
                      <ReferenceLine y={0} stroke="#000" strokeDasharray="3 3" />
                      <Area 
                        type="monotone" 
                        dataKey="cashFlow" 
                        name="Annual Cash Flow"
                        stroke="#275E91" 
                        fill="#275E91" 
                        fillOpacity={0.3}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="cumulativeCashFlow" 
                        name="Cumulative Cash Flow"
                        stroke="#7A8D79" 
                        fill="#7A8D79" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="m-0">
            <div className="space-y-6 px-2">
              {comparison ? (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Comparing with Baseline</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Baseline:</span>
                      <Badge variant="outline" className="text-xs font-normal">
                        {comparison.baselineScenario.name}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Current:</span>
                      <Badge className="text-xs font-normal bg-primary text-primary-foreground">
                        {comparison.updatedScenario.name}
                      </Badge>
                    </div>
                  </div>
                  
                  <Card className="border border-lg-highlight/30 shadow-md">
                    <CardHeader className="py-3 px-4 bg-lg-highlight/10 border-b border-lg-highlight/20">
                      <CardTitle className="text-sm text-lg-blue font-semibold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                          <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
                        </svg>
                        Key Metrics Comparison
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <div className="bg-lg-background rounded-md p-0.5">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-lg-highlight/10 border-b-lg-highlight/30">
                              <TableHead className="text-lg-text font-semibold">Metric</TableHead>
                              <TableHead className="text-lg-text font-semibold">Baseline</TableHead>
                              <TableHead className="text-lg-text font-semibold">Current</TableHead>
                              <TableHead className="text-lg-text font-semibold">Impact</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow className="border-b-lg-highlight/10 hover:bg-lg-highlight/5">
                              <TableCell className="font-medium text-lg-text">
                                <div className="flex items-center gap-1.5">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                  </svg>
                                  <span>IRR</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-lg-text">{formatMetric(comparison.baselineScenario.projectedMetrics.irr, 'percent')}</TableCell>
                              <TableCell className="font-medium text-lg-blue">{formatMetric(comparison.updatedScenario.projectedMetrics.irr, 'percent')}</TableCell>
                              <TableCell className={deltaColor(comparison.deltaMetrics.irr) === 'text-green-600' ? 'text-lg-success' : deltaColor(comparison.deltaMetrics.irr) === 'text-red-600' ? 'text-lg-error' : 'text-lg-text'}>
                                {formatDelta(comparison.deltaMetrics.irr, '%')}
                              </TableCell>
                            </TableRow>
                            <TableRow className="border-b-lg-highlight/10 hover:bg-lg-highlight/5">
                              <TableCell className="font-medium text-lg-text">
                                <div className="flex items-center gap-1.5">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m6 9 6 6 6-6" />
                                  </svg>
                                  <span>Equity Multiple</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-lg-text">{formatMetric(comparison.baselineScenario.projectedMetrics.equityMultiple, 'multiple')}</TableCell>
                              <TableCell className="font-medium text-lg-blue">{formatMetric(comparison.updatedScenario.projectedMetrics.equityMultiple, 'multiple')}</TableCell>
                              <TableCell className={deltaColor(comparison.deltaMetrics.equityMultiple) === 'text-green-600' ? 'text-lg-success' : deltaColor(comparison.deltaMetrics.equityMultiple) === 'text-red-600' ? 'text-lg-error' : 'text-lg-text'}>
                                {formatDelta(comparison.deltaMetrics.equityMultiple, 'x')}
                              </TableCell>
                            </TableRow>
                            <TableRow className="border-b-lg-highlight/10 hover:bg-lg-highlight/5">
                              <TableCell className="font-medium text-lg-text">
                                <div className="flex items-center gap-1.5">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 8v8"/>
                                    <path d="M8 12h8"/>
                                  </svg>
                                  <span>Cash on Cash</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-lg-text">{formatMetric(comparison.baselineScenario.projectedMetrics.cashOnCash, 'percent')}</TableCell>
                              <TableCell className="font-medium text-lg-blue">{formatMetric(comparison.updatedScenario.projectedMetrics.cashOnCash, 'percent')}</TableCell>
                              <TableCell className={deltaColor(comparison.deltaMetrics.cashOnCash) === 'text-green-600' ? 'text-lg-success' : deltaColor(comparison.deltaMetrics.cashOnCash) === 'text-red-600' ? 'text-lg-error' : 'text-lg-text'}>
                                {formatDelta(comparison.deltaMetrics.cashOnCash, '%')}
                              </TableCell>
                            </TableRow>
                            <TableRow className="border-b-lg-highlight/10 hover:bg-lg-highlight/5">
                              <TableCell className="font-medium text-lg-text">
                                <div className="flex items-center gap-1.5 group relative">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                  </svg>
                                  <span>ROI</span>
                                  <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block">
                                    <div className="bg-lg-footer text-lg-text text-xs p-2 rounded shadow-lg max-w-[180px] z-20">
                                      Return on Investment - total return relative to initial investment
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-lg-text">{formatMetric(comparison.baselineScenario.projectedMetrics.roi, 'percent')}</TableCell>
                              <TableCell className="font-medium text-lg-blue">{formatMetric(comparison.updatedScenario.projectedMetrics.roi, 'percent')}</TableCell>
                              <TableCell className={deltaColor(comparison.deltaMetrics.roi) === 'text-green-600' ? 'text-lg-success' : deltaColor(comparison.deltaMetrics.roi) === 'text-red-600' ? 'text-lg-error' : 'text-lg-text'}>
                                {formatDelta(comparison.deltaMetrics.roi, '%')}
                              </TableCell>
                            </TableRow>
                            <TableRow className="border-b-lg-highlight/10 hover:bg-lg-highlight/5">
                              <TableCell className="font-medium text-lg-text">
                                <div className="flex items-center gap-1.5 group relative">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 3v18h18"/>
                                    <path d="m19 9-5 5-4-4-3 3"/>
                                  </svg>
                                  <span>NPV</span>
                                  <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block">
                                    <div className="bg-lg-footer text-lg-text text-xs p-2 rounded shadow-lg max-w-[180px] z-20">
                                      Net Present Value - current value of all future cash flows
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-lg-text">{formatMetric(comparison.baselineScenario.projectedMetrics.npv, 'currency')}</TableCell>
                              <TableCell className="font-medium text-lg-blue">{formatMetric(comparison.updatedScenario.projectedMetrics.npv, 'currency')}</TableCell>
                              <TableCell className={deltaColor(comparison.deltaMetrics.npv) === 'text-green-600' ? 'text-lg-success' : deltaColor(comparison.deltaMetrics.npv) === 'text-red-600' ? 'text-lg-error' : 'text-lg-text'}>
                                {formatDelta(comparison.deltaMetrics.npv, '')}
                              </TableCell>
                            </TableRow>
                            <TableRow className="hover:bg-lg-highlight/5">
                              <TableCell className="font-medium text-lg-text">
                                <div className="flex items-center gap-1.5 group relative">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12 6 12 12 16 14"/>
                                  </svg>
                                  <span>Payback Period</span>
                                  <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block">
                                    <div className="bg-lg-footer text-lg-text text-xs p-2 rounded shadow-lg max-w-[180px] z-20">
                                      Time required to recover the initial investment
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-lg-text">{formatMetric(comparison.baselineScenario.projectedMetrics.paybackPeriod, 'time')}</TableCell>
                              <TableCell className="font-medium text-lg-blue">{formatMetric(comparison.updatedScenario.projectedMetrics.paybackPeriod, 'time')}</TableCell>
                              <TableCell className={
                                comparison.deltaMetrics.paybackPeriod < 0 ? 'text-lg-success' : 
                                comparison.deltaMetrics.paybackPeriod > 0 ? 'text-lg-error' : 
                                'text-lg-text'
                              }>
                                {comparison.deltaMetrics.paybackPeriod > 0 
                                  ? `+${formatMetric(comparison.deltaMetrics.paybackPeriod, 'time')}` 
                                  : comparison.deltaMetrics.paybackPeriod < 0 
                                  ? `-${formatMetric(Math.abs(comparison.deltaMetrics.paybackPeriod), 'time')}` 
                                  : '0m'}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-lg-highlight/30 shadow-md">
                    <CardHeader className="py-3 px-4 bg-lg-highlight/10 border-b border-lg-highlight/20">
                      <CardTitle className="text-sm text-lg-blue font-semibold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Parameter Changes from Baseline
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 py-3 bg-lg-background">
                      <div className="space-y-1">
                        {scenarioParams.map(param => {
                          const baselineValue = comparison.baselineScenario.params[param.id];
                          const currentValue = param.value;
                          const percentChange = baselineValue !== 0 
                            ? ((currentValue - baselineValue) / baselineValue) * 100
                            : 0;
                          
                          // Only show parameters that have changed from baseline
                          if (baselineValue === currentValue) return null;
                          
                          return (
                            <div key={param.id} className="flex justify-between items-center py-3 border-b border-lg-highlight/20 last:border-0">
                              <div className="flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#275E91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                                </svg>
                                <span className="text-sm font-medium text-lg-text">{param.name}</span>
                                <Badge 
                                  variant="outline" 
                                  className={cn(
                                    "ml-2 text-xs",
                                    param.impact === "high" ? "border-lg-error text-lg-error" : 
                                    param.impact === "medium" ? "border-lg-warning text-lg-warning" : 
                                    "border-lg-blue text-lg-blue"
                                  )}
                                >
                                  {param.impact} impact
                                </Badge>
                              </div>
                              <div className="space-y-1.5 bg-lg-highlight/5 p-2 rounded-md">
                                <div className="flex justify-between text-xs">
                                  <span className="mr-8 text-lg-text font-medium">Baseline: </span>
                                  <span className="text-lg-text">{param.unit === '$' 
                                    ? formatCurrency(baselineValue) 
                                    : `${baselineValue}${param.unit}`}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="mr-8 text-lg-text font-medium">Current: </span>
                                  <span className="text-lg-blue font-semibold">{param.unit === '$' 
                                    ? formatCurrency(currentValue) 
                                    : `${currentValue}${param.unit}`}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="mr-8 text-lg-text font-medium">Change: </span>
                                  <span className={
                                    percentChange > 0 ? 'text-lg-success font-medium' : 
                                    percentChange < 0 ? 'text-lg-error font-medium' : 
                                    'text-lg-text'
                                  }>
                                    {percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {!scenarioParams.some(param => {
                          const baselineValue = comparison.baselineScenario.params[param.id];
                          return baselineValue !== param.value;
                        }) && (
                          <div className="py-4 text-center text-sm text-lg-text/70">
                            No parameter changes from baseline scenario
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center bg-lg-background rounded-lg border border-lg-highlight/20">
                  <div className="rounded-full bg-lg-highlight/20 p-4">
                    <ChevronRightIcon className="h-7 w-7 text-lg-blue" />
                  </div>
                  <h3 className="text-lg font-medium text-lg-blue">No Comparison Available</h3>
                  <p className="text-sm text-lg-text max-w-[320px]">
                    Select a different scenario or modify parameters to compare with the baseline scenario.
                  </p>
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      className="border-lg-blue text-lg-blue hover:bg-lg-highlight/10"
                      onClick={() => setActiveTab("parameters")}
                    >
                      Adjust Parameters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Save Scenario Dialog */}
      <Dialog open={showNewScenarioDialog} onOpenChange={setShowNewScenarioDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Scenario</DialogTitle>
            <DialogDescription>
              Give your scenario a descriptive name to save the current parameters.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="scenario-name" className="text-sm font-medium">
                  Scenario Name
                </label>
                <Input
                  id="scenario-name"
                  placeholder="e.g., Optimistic Growth"
                  value={newScenarioName}
                  onChange={(e) => setNewScenarioName(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Parameter Changes</h4>
                <div className="rounded-md border p-3 text-sm">
                  <ul className="space-y-1 list-disc pl-4">
                    {scenarioParams.map(param => {
                      const baselineParam = baselineParams.find(bp => bp.id === param.id);
                      if (baselineParam && param.value !== baselineParam.value) {
                        return (
                          <li key={param.id}>
                            <span className="text-muted-foreground">{param.name}: </span>
                            <span>{baselineParam.unit === '$' 
                              ? `${formatCurrency(baselineParam.value)} → ${formatCurrency(param.value)}` 
                              : `${baselineParam.value}${baselineParam.unit} → ${param.value}${param.unit}`}
                            </span>
                          </li>
                        );
                      }
                      return null;
                    }).filter(Boolean)}
                    {!scenarioParams.some(param => {
                      const baselineParam = baselineParams.find(bp => bp.id === param.id);
                      return baselineParam && param.value !== baselineParam.value;
                    }) && (
                      <li className="text-muted-foreground">No changes from baseline</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowNewScenarioDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateScenario}
              disabled={!newScenarioName.trim()}
              className="bg-lg-blue hover:bg-lg-blue-hover text-white"
            >
              Save Scenario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}