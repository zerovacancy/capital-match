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
              
              <Card className="bg-primary/5 border border-primary/10">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm">
                    Projected Returns with Current Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-0 px-4 pb-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">IRR</p>
                      <p className="text-xl font-bold">{formatMetric(currentProjectedMetrics.irr, 'percent')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Equity Multiple</p>
                      <p className="text-xl font-bold">{formatMetric(currentProjectedMetrics.equityMultiple, 'multiple')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Cash on Cash</p>
                      <p className="text-xl font-bold">{formatMetric(currentProjectedMetrics.cashOnCash, 'percent')}</p>
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
                  
                  <Card>
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm">Key Metrics Comparison</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Metric</TableHead>
                            <TableHead>Baseline</TableHead>
                            <TableHead>Current</TableHead>
                            <TableHead>Impact</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">IRR</TableCell>
                            <TableCell>{formatMetric(comparison.baselineScenario.projectedMetrics.irr, 'percent')}</TableCell>
                            <TableCell>{formatMetric(comparison.updatedScenario.projectedMetrics.irr, 'percent')}</TableCell>
                            <TableCell className={deltaColor(comparison.deltaMetrics.irr)}>
                              {formatDelta(comparison.deltaMetrics.irr, '%')}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Equity Multiple</TableCell>
                            <TableCell>{formatMetric(comparison.baselineScenario.projectedMetrics.equityMultiple, 'multiple')}</TableCell>
                            <TableCell>{formatMetric(comparison.updatedScenario.projectedMetrics.equityMultiple, 'multiple')}</TableCell>
                            <TableCell className={deltaColor(comparison.deltaMetrics.equityMultiple)}>
                              {formatDelta(comparison.deltaMetrics.equityMultiple, 'x')}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Cash on Cash</TableCell>
                            <TableCell>{formatMetric(comparison.baselineScenario.projectedMetrics.cashOnCash, 'percent')}</TableCell>
                            <TableCell>{formatMetric(comparison.updatedScenario.projectedMetrics.cashOnCash, 'percent')}</TableCell>
                            <TableCell className={deltaColor(comparison.deltaMetrics.cashOnCash)}>
                              {formatDelta(comparison.deltaMetrics.cashOnCash, '%')}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">ROI</TableCell>
                            <TableCell>{formatMetric(comparison.baselineScenario.projectedMetrics.roi, 'percent')}</TableCell>
                            <TableCell>{formatMetric(comparison.updatedScenario.projectedMetrics.roi, 'percent')}</TableCell>
                            <TableCell className={deltaColor(comparison.deltaMetrics.roi)}>
                              {formatDelta(comparison.deltaMetrics.roi, '%')}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">NPV</TableCell>
                            <TableCell>{formatMetric(comparison.baselineScenario.projectedMetrics.npv, 'currency')}</TableCell>
                            <TableCell>{formatMetric(comparison.updatedScenario.projectedMetrics.npv, 'currency')}</TableCell>
                            <TableCell className={deltaColor(comparison.deltaMetrics.npv)}>
                              {formatDelta(comparison.deltaMetrics.npv, '')}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Payback Period</TableCell>
                            <TableCell>{formatMetric(comparison.baselineScenario.projectedMetrics.paybackPeriod, 'time')}</TableCell>
                            <TableCell>{formatMetric(comparison.updatedScenario.projectedMetrics.paybackPeriod, 'time')}</TableCell>
                            <TableCell className={
                              comparison.deltaMetrics.paybackPeriod < 0 ? 'text-green-600' : 
                              comparison.deltaMetrics.paybackPeriod > 0 ? 'text-red-600' : 
                              'text-gray-600'
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
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm">Parameter Changes from Baseline</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      {scenarioParams.map(param => {
                        const baselineValue = comparison.baselineScenario.params[param.id];
                        const currentValue = param.value;
                        const percentChange = baselineValue !== 0 
                          ? ((currentValue - baselineValue) / baselineValue) * 100
                          : 0;
                        
                        // Only show parameters that have changed from baseline
                        if (baselineValue === currentValue) return null;
                        
                        return (
                          <div key={param.id} className="flex justify-between items-center py-2 border-b last:border-0">
                            <div className="flex items-center gap-1">
                              <span className="text-sm">{param.name}</span>
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
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="mr-8 text-muted-foreground">Baseline: </span>
                                <span>{param.unit === '$' 
                                  ? formatCurrency(baselineValue) 
                                  : `${baselineValue}${param.unit}`}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="mr-8 text-muted-foreground">Current: </span>
                                <span className="font-medium">{param.unit === '$' 
                                  ? formatCurrency(currentValue) 
                                  : `${currentValue}${param.unit}`}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="mr-8 text-muted-foreground">Change: </span>
                                <span className={
                                  percentChange > 0 ? 'text-green-600' : 
                                  percentChange < 0 ? 'text-red-600' : 
                                  'text-gray-600'
                                }>
                                  {percentChange.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <ChevronRightIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No Comparison Available</h3>
                  <p className="text-sm text-muted-foreground max-w-[300px]">
                    Select a different scenario or modify parameters to compare with the baseline scenario.
                  </p>
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
              className="bg-[#275E91] hover:bg-[#275E91]/90"
            >
              Save Scenario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}